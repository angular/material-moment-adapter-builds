/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Inject, Injectable, Optional, InjectionToken } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
// TODO(mmalerba): See if we can clean this up at some point.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;
/** InjectionToken for moment date adapter to configure options. */
export const MAT_MOMENT_DATE_ADAPTER_OPTIONS = new InjectionToken('MAT_MOMENT_DATE_ADAPTER_OPTIONS', {
    providedIn: 'root',
    factory: MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY
});
/** @docs-private */
export function MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY() {
    return {
        useUtc: false
    };
}
/** Creates an array and fills it with values. */
function range(length, valueFunction) {
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
/** Adapts Moment.js Dates for use with Angular Material. */
let MomentDateAdapter = /** @class */ (() => {
    class MomentDateAdapter extends DateAdapter {
        constructor(dateLocale, _options) {
            super();
            this._options = _options;
            this.setLocale(dateLocale || moment.locale());
        }
        setLocale(locale) {
            super.setLocale(locale);
            let momentLocaleData = moment.localeData(locale);
            this._localeData = {
                firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
                longMonths: momentLocaleData.months(),
                shortMonths: momentLocaleData.monthsShort(),
                dates: range(31, (i) => this.createDate(2017, 0, i + 1).format('D')),
                longDaysOfWeek: momentLocaleData.weekdays(),
                shortDaysOfWeek: momentLocaleData.weekdaysShort(),
                narrowDaysOfWeek: momentLocaleData.weekdaysMin(),
            };
        }
        getYear(date) {
            return this.clone(date).year();
        }
        getMonth(date) {
            return this.clone(date).month();
        }
        getDate(date) {
            return this.clone(date).date();
        }
        getDayOfWeek(date) {
            return this.clone(date).day();
        }
        getMonthNames(style) {
            // Moment.js doesn't support narrow month names, so we just use short if narrow is requested.
            return style == 'long' ? this._localeData.longMonths : this._localeData.shortMonths;
        }
        getDateNames() {
            return this._localeData.dates;
        }
        getDayOfWeekNames(style) {
            if (style == 'long') {
                return this._localeData.longDaysOfWeek;
            }
            if (style == 'short') {
                return this._localeData.shortDaysOfWeek;
            }
            return this._localeData.narrowDaysOfWeek;
        }
        getYearName(date) {
            return this.clone(date).format('YYYY');
        }
        getFirstDayOfWeek() {
            return this._localeData.firstDayOfWeek;
        }
        getNumDaysInMonth(date) {
            return this.clone(date).daysInMonth();
        }
        clone(date) {
            return date.clone().locale(this.locale);
        }
        createDate(year, month, date) {
            // Moment.js will create an invalid date if any of the components are out of bounds, but we
            // explicitly check each case so we can throw more descriptive errors.
            if (month < 0 || month > 11) {
                throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
            }
            if (date < 1) {
                throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
            }
            const result = this._createMoment({ year, month, date }).locale(this.locale);
            // If the result isn't valid, the date must have been out of bounds for this month.
            if (!result.isValid()) {
                throw Error(`Invalid date "${date}" for month with index "${month}".`);
            }
            return result;
        }
        today() {
            return this._createMoment().locale(this.locale);
        }
        parse(value, parseFormat) {
            if (value && typeof value == 'string') {
                return this._createMoment(value, parseFormat, this.locale);
            }
            return value ? this._createMoment(value).locale(this.locale) : null;
        }
        format(date, displayFormat) {
            date = this.clone(date);
            if (!this.isValid(date)) {
                throw Error('MomentDateAdapter: Cannot format invalid date.');
            }
            return date.format(displayFormat);
        }
        addCalendarYears(date, years) {
            return this.clone(date).add({ years });
        }
        addCalendarMonths(date, months) {
            return this.clone(date).add({ months });
        }
        addCalendarDays(date, days) {
            return this.clone(date).add({ days });
        }
        toIso8601(date) {
            return this.clone(date).format();
        }
        /**
         * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
         * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
         * string into null. Returns an invalid date for all other values.
         */
        deserialize(value) {
            let date;
            if (value instanceof Date) {
                date = this._createMoment(value).locale(this.locale);
            }
            else if (this.isDateInstance(value)) {
                // Note: assumes that cloning also sets the correct locale.
                return this.clone(value);
            }
            if (typeof value === 'string') {
                if (!value) {
                    return null;
                }
                date = this._createMoment(value, moment.ISO_8601).locale(this.locale);
            }
            if (date && this.isValid(date)) {
                return this._createMoment(date).locale(this.locale);
            }
            return super.deserialize(value);
        }
        isDateInstance(obj) {
            return moment.isMoment(obj);
        }
        isValid(date) {
            return this.clone(date).isValid();
        }
        invalid() {
            return moment.invalid();
        }
        /** Creates a Moment instance while respecting the current UTC settings. */
        _createMoment(date, format, locale) {
            const { strict, useUtc } = this._options || {};
            return useUtc
                ? moment.utc(date, format, locale, strict)
                : moment(date, format, locale, strict);
        }
    }
    MomentDateAdapter.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MomentDateAdapter.ctorParameters = () => [
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATE_LOCALE,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_MOMENT_DATE_ADAPTER_OPTIONS,] }] }
    ];
    return MomentDateAdapter;
})();
export { MomentDateAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1tb21lbnQtYWRhcHRlci9hZGFwdGVyL21vbWVudC1kYXRlLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUMsV0FBVyxFQUFFLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3BFLGdGQUFnRjtBQUNoRiw2RkFBNkY7QUFDN0YsaUdBQWlHO0FBQ2pHLDJCQUEyQjtBQUMzQiw2REFBNkQ7QUFDN0QsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFDbEMsZ0RBQWdEO0FBQ2hELE9BQU8sRUFBQyxPQUFPLElBQUksYUFBYSxFQUFpRCxNQUFNLFFBQVEsQ0FBQztBQUVoRyxNQUFNLE1BQU0sR0FBRyxhQUFhLElBQUksT0FBTyxDQUFDO0FBbUJ4QyxtRUFBbUU7QUFDbkUsTUFBTSxDQUFDLE1BQU0sK0JBQStCLEdBQUcsSUFBSSxjQUFjLENBQy9ELGlDQUFpQyxFQUFFO0lBQ2pDLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSx1Q0FBdUM7Q0FDbkQsQ0FBQyxDQUFDO0FBR0gsb0JBQW9CO0FBQ3BCLE1BQU0sVUFBVSx1Q0FBdUM7SUFDckQsT0FBTztRQUNMLE1BQU0sRUFBRSxLQUFLO0tBQ2QsQ0FBQztBQUNKLENBQUM7QUFHRCxpREFBaUQ7QUFDakQsU0FBUyxLQUFLLENBQUksTUFBYyxFQUFFLGFBQW1DO0lBQ25FLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFB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QUM7UUFFRCxPQUFPO1lBQ0wsT0FBTyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUIsQ0FBQztRQUVELDJFQUEyRTtRQUNuRSxhQUFhLENBQ25CLElBQWlCLEVBQ2pCLE1BQWtDLEVBQ2xDLE1BQWU7WUFFZixNQUFNLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBQyxHQUFnQyxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztZQUUxRSxPQUFPLE1BQU07Z0JBQ1gsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO2dCQUMxQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLENBQUM7OztnQkFuTUYsVUFBVTs7Ozs2Q0FpQkksUUFBUSxZQUFJLE1BQU0sU0FBQyxlQUFlO2dEQUM1QyxRQUFRLFlBQUksTUFBTSxTQUFDLCtCQUErQjs7SUFrTHZELHdCQUFDO0tBQUE7U0FuTVksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCwgSW5qZWN0aW9uVG9rZW59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEYXRlQWRhcHRlciwgTUFUX0RBVEVfTE9DQUxFfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbi8vIERlcGVuZGluZyBvbiB3aGV0aGVyIHJvbGx1cCBpcyB1c2VkLCBtb21lbnQgbmVlZHMgdG8gYmUgaW1wb3J0ZWQgZGlmZmVyZW50bHkuXG4vLyBTaW5jZSBNb21lbnQuanMgZG9lc24ndCBoYXZlIGEgZGVmYXVsdCBleHBvcnQsIHdlIG5vcm1hbGx5IG5lZWQgdG8gaW1wb3J0IHVzaW5nIHRoZSBgKiBhc2Bcbi8vIHN5bnRheC4gSG93ZXZlciwgcm9sbHVwIGNyZWF0ZXMgYSBzeW50aGV0aWMgZGVmYXVsdCBtb2R1bGUgYW5kIHdlIHRodXMgbmVlZCB0byBpbXBvcnQgaXQgdXNpbmdcbi8vIHRoZSBgZGVmYXVsdCBhc2Agc3ludGF4LlxuLy8gVE9ETyhtbWFsZXJiYSk6IFNlZSBpZiB3ZSBjYW4gY2xlYW4gdGhpcyB1cCBhdCBzb21lIHBvaW50LlxuaW1wb3J0ICogYXMgX21vbWVudCBmcm9tICdtb21lbnQnO1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWR1cGxpY2F0ZS1pbXBvcnRzXG5pbXBvcnQge2RlZmF1bHQgYXMgX3JvbGx1cE1vbWVudCwgTW9tZW50LCBNb21lbnRGb3JtYXRTcGVjaWZpY2F0aW9uLCBNb21lbnRJbnB1dH0gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gX3JvbGx1cE1vbWVudCB8fCBfbW9tZW50O1xuXG4vKiogQ29uZmlndXJhYmxlIG9wdGlvbnMgZm9yIHtAc2VlIE1vbWVudERhdGVBZGFwdGVyfS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0TW9tZW50RGF0ZUFkYXB0ZXJPcHRpb25zIHtcblxuICAvKipcbiAgICogV2hlbiBlbmFibGVkLCB0aGUgZGF0ZXMgaGF2ZSB0byBtYXRjaCB0aGUgZm9ybWF0IGV4YWN0bHkuXG4gICAqIFNlZSBodHRwczovL21vbWVudGpzLmNvbS9ndWlkZXMvIy9wYXJzaW5nL3N0cmljdC1tb2RlLy5cbiAgICovXG4gIHN0cmljdD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFR1cm5zIHRoZSB1c2Ugb2YgdXRjIGRhdGVzIG9uIG9yIG9mZi5cbiAgICogQ2hhbmdpbmcgdGhpcyB3aWxsIGNoYW5nZSBob3cgQW5ndWxhciBNYXRlcmlhbCBjb21wb25lbnRzIGxpa2UgRGF0ZVBpY2tlciBvdXRwdXQgZGF0ZXMuXG4gICAqIHtAZGVmYXVsdCBmYWxzZX1cbiAgICovXG4gIHVzZVV0Yz86IGJvb2xlYW47XG59XG5cbi8qKiBJbmplY3Rpb25Ub2tlbiBmb3IgbW9tZW50IGRhdGUgYWRhcHRlciB0byBjb25maWd1cmUgb3B0aW9ucy4gKi9cbmV4cG9ydCBjb25zdCBNQVRfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPE1hdE1vbWVudERhdGVBZGFwdGVyT3B0aW9ucz4oXG4gICdNQVRfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TJywge1xuICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICBmYWN0b3J5OiBNQVRfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TX0ZBQ1RPUllcbn0pO1xuXG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZnVuY3Rpb24gTUFUX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OU19GQUNUT1JZKCk6IE1hdE1vbWVudERhdGVBZGFwdGVyT3B0aW9ucyB7XG4gIHJldHVybiB7XG4gICAgdXNlVXRjOiBmYWxzZVxuICB9O1xufVxuXG5cbi8qKiBDcmVhdGVzIGFuIGFycmF5IGFuZCBmaWxscyBpdCB3aXRoIHZhbHVlcy4gKi9cbmZ1bmN0aW9uIHJhbmdlPFQ+KGxlbmd0aDogbnVtYmVyLCB2YWx1ZUZ1bmN0aW9uOiAoaW5kZXg6IG51bWJlcikgPT4gVCk6IFRbXSB7XG4gIGNvbnN0IHZhbHVlc0FycmF5ID0gQXJyYXkobGVuZ3RoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHZhbHVlc0FycmF5W2ldID0gdmFsdWVGdW5jdGlvbihpKTtcbiAgfVxuICByZXR1cm4gdmFsdWVzQXJyYXk7XG59XG5cblxuLyoqIEFkYXB0cyBNb21lbnQuanMgRGF0ZXMgZm9yIHVzZSB3aXRoIEFuZ3VsYXIgTWF0ZXJpYWwuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9tZW50RGF0ZUFkYXB0ZXIgZXh0ZW5kcyBEYXRlQWRhcHRlcjxNb21lbnQ+IHtcbiAgLy8gTm90ZTogYWxsIG9mIHRoZSBtZXRob2RzIHRoYXQgYWNjZXB0IGEgYE1vbWVudGAgaW5wdXQgcGFyYW1ldGVyIGltbWVkaWF0ZWx5IGNhbGwgYHRoaXMuY2xvbmVgXG4gIC8vIG9uIGl0LiBUaGlzIGlzIHRvIGVuc3VyZSB0aGF0IHdlJ3JlIHdvcmtpbmcgd2l0aCBhIGBNb21lbnRgIHRoYXQgaGFzIHRoZSBjb3JyZWN0IGxvY2FsZSBzZXR0aW5nXG4gIC8vIHdoaWxlIGF2b2lkaW5nIG11dGF0aW5nIHRoZSBvcmlnaW5hbCBvYmplY3QgcGFzc2VkIHRvIHVzLiBKdXN0IGNhbGxpbmcgYC5sb2NhbGUoLi4uKWAgb24gdGhlXG4gIC8vIGlucHV0IHdvdWxkIG11dGF0ZSB0aGUgb2JqZWN0LlxuXG4gIHByaXZhdGUgX2xvY2FsZURhdGE6IHtcbiAgICBmaXJzdERheU9mV2VlazogbnVtYmVyLFxuICAgIGxvbmdNb250aHM6IHN0cmluZ1tdLFxuICAgIHNob3J0TW9udGhzOiBzdHJpbmdbXSxcbiAgICBkYXRlczogc3RyaW5nW10sXG4gICAgbG9uZ0RheXNPZldlZWs6IHN0cmluZ1tdLFxuICAgIHNob3J0RGF5c09mV2Vlazogc3RyaW5nW10sXG4gICAgbmFycm93RGF5c09mV2Vlazogc3RyaW5nW11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9EQVRFX0xPQ0FMRSkgZGF0ZUxvY2FsZTogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OUylcbiAgICBwcml2YXRlIF9vcHRpb25zPzogTWF0TW9tZW50RGF0ZUFkYXB0ZXJPcHRpb25zKSB7XG5cbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc2V0TG9jYWxlKGRhdGVMb2NhbGUgfHwgbW9tZW50LmxvY2FsZSgpKTtcbiAgfVxuXG4gIHNldExvY2FsZShsb2NhbGU6IHN0cmluZykge1xuICAgIHN1cGVyLnNldExvY2FsZShsb2NhbGUpO1xuXG4gICAgbGV0IG1vbWVudExvY2FsZURhdGEgPSBtb21lbnQubG9jYWxlRGF0YShsb2NhbGUpO1xuICAgIHRoaXMuX2xvY2FsZURhdGEgPSB7XG4gICAgICBmaXJzdERheU9mV2VlazogbW9tZW50TG9jYWxlRGF0YS5maXJzdERheU9mV2VlaygpLFxuICAgICAgbG9uZ01vbnRoczogbW9tZW50TG9jYWxlRGF0YS5tb250aHMoKSxcbiAgICAgIHNob3J0TW9udGhzOiBtb21lbnRMb2NhbGVEYXRhLm1vbnRoc1Nob3J0KCksXG4gICAgICBkYXRlczogcmFuZ2UoMzEsIChpKSA9PiB0aGlzLmNyZWF0ZURhdGUoMjAxNywgMCwgaSArIDEpLmZvcm1hdCgnRCcpKSxcbiAgICAgIGxvbmdEYXlzT2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLndlZWtkYXlzKCksXG4gICAgICBzaG9ydERheXNPZldlZWs6IG1vbWVudExvY2FsZURhdGEud2Vla2RheXNTaG9ydCgpLFxuICAgICAgbmFycm93RGF5c09mV2VlazogbW9tZW50TG9jYWxlRGF0YS53ZWVrZGF5c01pbigpLFxuICAgIH07XG4gIH1cblxuICBnZXRZZWFyKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkueWVhcigpO1xuICB9XG5cbiAgZ2V0TW9udGgoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5tb250aCgpO1xuICB9XG5cbiAgZ2V0RGF0ZShkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmRhdGUoKTtcbiAgfVxuXG4gIGdldERheU9mV2VlayhkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmRheSgpO1xuICB9XG5cbiAgZ2V0TW9udGhOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW10ge1xuICAgIC8vIE1vbWVudC5qcyBkb2Vzbid0IHN1cHBvcnQgbmFycm93IG1vbnRoIG5hbWVzLCBzbyB3ZSBqdXN0IHVzZSBzaG9ydCBpZiBuYXJyb3cgaXMgcmVxdWVzdGVkLlxuICAgIHJldHVybiBzdHlsZSA9PSAnbG9uZycgPyB0aGlzLl9sb2NhbGVEYXRhLmxvbmdNb250aHMgOiB0aGlzLl9sb2NhbGVEYXRhLnNob3J0TW9udGhzO1xuICB9XG5cbiAgZ2V0RGF0ZU5hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxlRGF0YS5kYXRlcztcbiAgfVxuXG4gIGdldERheU9mV2Vla05hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XG4gICAgaWYgKHN0eWxlID09ICdsb25nJykge1xuICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZURhdGEubG9uZ0RheXNPZldlZWs7XG4gICAgfVxuICAgIGlmIChzdHlsZSA9PSAnc2hvcnQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbG9jYWxlRGF0YS5zaG9ydERheXNPZldlZWs7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9sb2NhbGVEYXRhLm5hcnJvd0RheXNPZldlZWs7XG4gIH1cblxuICBnZXRZZWFyTmFtZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmZvcm1hdCgnWVlZWScpO1xuICB9XG5cbiAgZ2V0Rmlyc3REYXlPZldlZWsoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxlRGF0YS5maXJzdERheU9mV2VlaztcbiAgfVxuXG4gIGdldE51bURheXNJbk1vbnRoKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZGF5c0luTW9udGgoKTtcbiAgfVxuXG4gIGNsb25lKGRhdGU6IE1vbWVudCk6IE1vbWVudCB7XG4gICAgcmV0dXJuIGRhdGUuY2xvbmUoKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICB9XG5cbiAgY3JlYXRlRGF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRhdGU6IG51bWJlcik6IE1vbWVudCB7XG4gICAgLy8gTW9tZW50LmpzIHdpbGwgY3JlYXRlIGFuIGludmFsaWQgZGF0ZSBpZiBhbnkgb2YgdGhlIGNvbXBvbmVudHMgYXJlIG91dCBvZiBib3VuZHMsIGJ1dCB3ZVxuICAgIC8vIGV4cGxpY2l0bHkgY2hlY2sgZWFjaCBjYXNlIHNvIHdlIGNhbiB0aHJvdyBtb3JlIGRlc2NyaXB0aXZlIGVycm9ycy5cbiAgICBpZiAobW9udGggPCAwIHx8IG1vbnRoID4gMTEpIHtcbiAgICAgIHRocm93IEVycm9yKGBJbnZhbGlkIG1vbnRoIGluZGV4IFwiJHttb250aH1cIi4gTW9udGggaW5kZXggaGFzIHRvIGJlIGJldHdlZW4gMCBhbmQgMTEuYCk7XG4gICAgfVxuXG4gICAgaWYgKGRhdGUgPCAxKSB7XG4gICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBkYXRlIFwiJHtkYXRlfVwiLiBEYXRlIGhhcyB0byBiZSBncmVhdGVyIHRoYW4gMC5gKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9jcmVhdGVNb21lbnQoe3llYXIsIG1vbnRoLCBkYXRlfSkubG9jYWxlKHRoaXMubG9jYWxlKTtcblxuICAgIC8vIElmIHRoZSByZXN1bHQgaXNuJ3QgdmFsaWQsIHRoZSBkYXRlIG11c3QgaGF2ZSBiZWVuIG91dCBvZiBib3VuZHMgZm9yIHRoaXMgbW9udGguXG4gICAgaWYgKCFyZXN1bHQuaXNWYWxpZCgpKSB7XG4gICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBkYXRlIFwiJHtkYXRlfVwiIGZvciBtb250aCB3aXRoIGluZGV4IFwiJHttb250aH1cIi5gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdG9kYXkoKTogTW9tZW50IHtcbiAgICByZXR1cm4gdGhpcy5fY3JlYXRlTW9tZW50KCkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgfVxuXG4gIHBhcnNlKHZhbHVlOiBhbnksIHBhcnNlRm9ybWF0OiBzdHJpbmcgfCBzdHJpbmdbXSk6IE1vbWVudCB8IG51bGwge1xuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVNb21lbnQodmFsdWUsIHBhcnNlRm9ybWF0LCB0aGlzLmxvY2FsZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZSA/IHRoaXMuX2NyZWF0ZU1vbWVudCh2YWx1ZSkubG9jYWxlKHRoaXMubG9jYWxlKSA6IG51bGw7XG4gIH1cblxuICBmb3JtYXQoZGF0ZTogTW9tZW50LCBkaXNwbGF5Rm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGRhdGUgPSB0aGlzLmNsb25lKGRhdGUpO1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKGRhdGUpKSB7XG4gICAgICB0aHJvdyBFcnJvcignTW9tZW50RGF0ZUFkYXB0ZXI6IENhbm5vdCBmb3JtYXQgaW52YWxpZCBkYXRlLicpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0ZS5mb3JtYXQoZGlzcGxheUZvcm1hdCk7XG4gIH1cblxuICBhZGRDYWxlbmRhclllYXJzKGRhdGU6IE1vbWVudCwgeWVhcnM6IG51bWJlcik6IE1vbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuYWRkKHt5ZWFyc30pO1xuICB9XG5cbiAgYWRkQ2FsZW5kYXJNb250aHMoZGF0ZTogTW9tZW50LCBtb250aHM6IG51bWJlcik6IE1vbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuYWRkKHttb250aHN9KTtcbiAgfVxuXG4gIGFkZENhbGVuZGFyRGF5cyhkYXRlOiBNb21lbnQsIGRheXM6IG51bWJlcik6IE1vbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuYWRkKHtkYXlzfSk7XG4gIH1cblxuICB0b0lzbzg2MDEoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5mb3JtYXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBnaXZlbiB2YWx1ZSBpZiBnaXZlbiBhIHZhbGlkIE1vbWVudCBvciBudWxsLiBEZXNlcmlhbGl6ZXMgdmFsaWQgSVNPIDg2MDEgc3RyaW5nc1xuICAgKiAoaHR0cHM6Ly93d3cuaWV0Zi5vcmcvcmZjL3JmYzMzMzkudHh0KSBhbmQgdmFsaWQgRGF0ZSBvYmplY3RzIGludG8gdmFsaWQgTW9tZW50cyBhbmQgZW1wdHlcbiAgICogc3RyaW5nIGludG8gbnVsbC4gUmV0dXJucyBhbiBpbnZhbGlkIGRhdGUgZm9yIGFsbCBvdGhlciB2YWx1ZXMuXG4gICAqL1xuICBkZXNlcmlhbGl6ZSh2YWx1ZTogYW55KTogTW9tZW50IHwgbnVsbCB7XG4gICAgbGV0IGRhdGU7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgZGF0ZSA9IHRoaXMuX2NyZWF0ZU1vbWVudCh2YWx1ZSkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNEYXRlSW5zdGFuY2UodmFsdWUpKSB7XG4gICAgICAvLyBOb3RlOiBhc3N1bWVzIHRoYXQgY2xvbmluZyBhbHNvIHNldHMgdGhlIGNvcnJlY3QgbG9jYWxlLlxuICAgICAgcmV0dXJuIHRoaXMuY2xvbmUodmFsdWUpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGRhdGUgPSB0aGlzLl9jcmVhdGVNb21lbnQodmFsdWUsIG1vbWVudC5JU09fODYwMSkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICB9XG4gICAgaWYgKGRhdGUgJiYgdGhpcy5pc1ZhbGlkKGRhdGUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY3JlYXRlTW9tZW50KGRhdGUpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgfVxuICAgIHJldHVybiBzdXBlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gIH1cblxuICBpc0RhdGVJbnN0YW5jZShvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBtb21lbnQuaXNNb21lbnQob2JqKTtcbiAgfVxuXG4gIGlzVmFsaWQoZGF0ZTogTW9tZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuaXNWYWxpZCgpO1xuICB9XG5cbiAgaW52YWxpZCgpOiBNb21lbnQge1xuICAgIHJldHVybiBtb21lbnQuaW52YWxpZCgpO1xuICB9XG5cbiAgLyoqIENyZWF0ZXMgYSBNb21lbnQgaW5zdGFuY2Ugd2hpbGUgcmVzcGVjdGluZyB0aGUgY3VycmVudCBVVEMgc2V0dGluZ3MuICovXG4gIHByaXZhdGUgX2NyZWF0ZU1vbWVudChcbiAgICBkYXRlOiBNb21lbnRJbnB1dCxcbiAgICBmb3JtYXQ/OiBNb21lbnRGb3JtYXRTcGVjaWZpY2F0aW9uLFxuICAgIGxvY2FsZT86IHN0cmluZyxcbiAgKTogTW9tZW50IHtcbiAgICBjb25zdCB7c3RyaWN0LCB1c2VVdGN9OiBNYXRNb21lbnREYXRlQWRhcHRlck9wdGlvbnMgPSB0aGlzLl9vcHRpb25zIHx8IHt9O1xuXG4gICAgcmV0dXJuIHVzZVV0Y1xuICAgICAgPyBtb21lbnQudXRjKGRhdGUsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QpXG4gICAgICA6IG1vbWVudChkYXRlLCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0KTtcbiAgfVxufVxuIl19