/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata, __param } from "tslib";
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
    let MomentDateAdapter = class MomentDateAdapter extends DateAdapter {
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
    };
    MomentDateAdapter = __decorate([
        Injectable(),
        __param(0, Optional()), __param(0, Inject(MAT_DATE_LOCALE)),
        __param(1, Optional()), __param(1, Inject(MAT_MOMENT_DATE_ADAPTER_OPTIONS)),
        __metadata("design:paramtypes", [String, Object])
    ], MomentDateAdapter);
    return MomentDateAdapter;
})();
export { MomentDateAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1tb21lbnQtYWRhcHRlci9hZGFwdGVyL21vbWVudC1kYXRlLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0UsT0FBTyxFQUFDLFdBQVcsRUFBRSxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRSxnRkFBZ0Y7QUFDaEYsNkZBQTZGO0FBQzdGLGlHQUFpRztBQUNqRywyQkFBMkI7QUFDM0IsNkRBQTZEO0FBQzdELE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLGdEQUFnRDtBQUNoRCxPQUFPLEVBQUMsT0FBTyxJQUFJLGFBQWEsRUFBaUQsTUFBTSxRQUFRLENBQUM7QUFFaEcsTUFBTSxNQUFNLEdBQUcsYUFBYSxJQUFJLE9BQU8sQ0FBQztBQW1CeEMsbUVBQW1FO0FBQ25FLE1BQU0sQ0FBQyxNQUFNLCtCQUErQixHQUFHLElBQUksY0FBYyxDQUMvRCxpQ0FBaUMsRUFBRTtJQUNqQyxVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsdUNBQXVDO0NBQ25ELENBQUMsQ0FBQztBQUdILG9CQUFvQjtBQUNwQixNQUFNLFVBQVUsdUNBQXVDO0lBQ3JELE9BQU87UUFDTCxNQUFNLEVBQUUsS0FBSztLQUNkLENBQUM7QUFDSixDQUFDO0FBR0QsaURBQWlEO0FBQ2pELFNBQVMsS0FBSyxDQUFJLE1BQWMsRUFBRSxhQUFtQztJQUNuRSxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVB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LEVBQUUsQ0FBQztRQUNwQyxDQUFDO1FBRUQsT0FBTztZQUNMLE9BQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFFRCwyRUFBMkU7UUFDbkUsYUFBYSxDQUNuQixJQUFpQixFQUNqQixNQUFrQyxFQUNsQyxNQUFlO1lBRWYsTUFBTSxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUMsR0FBZ0MsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7WUFFMUUsT0FBTyxNQUFNO2dCQUNYLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztnQkFDMUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzQyxDQUFDO0tBQ0YsQ0FBQTtJQW5NWSxpQkFBaUI7UUFEN0IsVUFBVSxFQUFFO1FBaUJFLFdBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUM3QyxXQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxNQUFNLENBQUMsK0JBQStCLENBQUMsQ0FBQTs7T0FqQjNDLGlCQUFpQixDQW1NN0I7SUFBRCx3QkFBQztLQUFBO1NBbk1ZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIEluamVjdGlvblRva2VufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RGF0ZUFkYXB0ZXIsIE1BVF9EQVRFX0xPQ0FMRX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG4vLyBEZXBlbmRpbmcgb24gd2hldGhlciByb2xsdXAgaXMgdXNlZCwgbW9tZW50IG5lZWRzIHRvIGJlIGltcG9ydGVkIGRpZmZlcmVudGx5LlxuLy8gU2luY2UgTW9tZW50LmpzIGRvZXNuJ3QgaGF2ZSBhIGRlZmF1bHQgZXhwb3J0LCB3ZSBub3JtYWxseSBuZWVkIHRvIGltcG9ydCB1c2luZyB0aGUgYCogYXNgXG4vLyBzeW50YXguIEhvd2V2ZXIsIHJvbGx1cCBjcmVhdGVzIGEgc3ludGhldGljIGRlZmF1bHQgbW9kdWxlIGFuZCB3ZSB0aHVzIG5lZWQgdG8gaW1wb3J0IGl0IHVzaW5nXG4vLyB0aGUgYGRlZmF1bHQgYXNgIHN5bnRheC5cbi8vIFRPRE8obW1hbGVyYmEpOiBTZWUgaWYgd2UgY2FuIGNsZWFuIHRoaXMgdXAgYXQgc29tZSBwb2ludC5cbmltcG9ydCAqIGFzIF9tb21lbnQgZnJvbSAnbW9tZW50Jztcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1kdXBsaWNhdGUtaW1wb3J0c1xuaW1wb3J0IHtkZWZhdWx0IGFzIF9yb2xsdXBNb21lbnQsIE1vbWVudCwgTW9tZW50Rm9ybWF0U3BlY2lmaWNhdGlvbiwgTW9tZW50SW5wdXR9IGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IF9yb2xsdXBNb21lbnQgfHwgX21vbWVudDtcblxuLyoqIENvbmZpZ3VyYWJsZSBvcHRpb25zIGZvciB7QHNlZSBNb21lbnREYXRlQWRhcHRlcn0uICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdE1vbWVudERhdGVBZGFwdGVyT3B0aW9ucyB7XG5cbiAgLyoqXG4gICAqIFdoZW4gZW5hYmxlZCwgdGhlIGRhdGVzIGhhdmUgdG8gbWF0Y2ggdGhlIGZvcm1hdCBleGFjdGx5LlxuICAgKiBTZWUgaHR0cHM6Ly9tb21lbnRqcy5jb20vZ3VpZGVzLyMvcGFyc2luZy9zdHJpY3QtbW9kZS8uXG4gICAqL1xuICBzdHJpY3Q/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUdXJucyB0aGUgdXNlIG9mIHV0YyBkYXRlcyBvbiBvciBvZmYuXG4gICAqIENoYW5naW5nIHRoaXMgd2lsbCBjaGFuZ2UgaG93IEFuZ3VsYXIgTWF0ZXJpYWwgY29tcG9uZW50cyBsaWtlIERhdGVQaWNrZXIgb3V0cHV0IGRhdGVzLlxuICAgKiB7QGRlZmF1bHQgZmFsc2V9XG4gICAqL1xuICB1c2VVdGM/OiBib29sZWFuO1xufVxuXG4vKiogSW5qZWN0aW9uVG9rZW4gZm9yIG1vbWVudCBkYXRlIGFkYXB0ZXIgdG8gY29uZmlndXJlIG9wdGlvbnMuICovXG5leHBvcnQgY29uc3QgTUFUX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNYXRNb21lbnREYXRlQWRhcHRlck9wdGlvbnM+KFxuICAnTUFUX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OUycsIHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgZmFjdG9yeTogTUFUX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OU19GQUNUT1JZXG59KTtcblxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1BVF9NT01FTlRfREFURV9BREFQVEVSX09QVElPTlNfRkFDVE9SWSgpOiBNYXRNb21lbnREYXRlQWRhcHRlck9wdGlvbnMge1xuICByZXR1cm4ge1xuICAgIHVzZVV0YzogZmFsc2VcbiAgfTtcbn1cblxuXG4vKiogQ3JlYXRlcyBhbiBhcnJheSBhbmQgZmlsbHMgaXQgd2l0aCB2YWx1ZXMuICovXG5mdW5jdGlvbiByYW5nZTxUPihsZW5ndGg6IG51bWJlciwgdmFsdWVGdW5jdGlvbjogKGluZGV4OiBudW1iZXIpID0+IFQpOiBUW10ge1xuICBjb25zdCB2YWx1ZXNBcnJheSA9IEFycmF5KGxlbmd0aCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICB2YWx1ZXNBcnJheVtpXSA9IHZhbHVlRnVuY3Rpb24oaSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlc0FycmF5O1xufVxuXG5cbi8qKiBBZGFwdHMgTW9tZW50LmpzIERhdGVzIGZvciB1c2Ugd2l0aCBBbmd1bGFyIE1hdGVyaWFsLiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vbWVudERhdGVBZGFwdGVyIGV4dGVuZHMgRGF0ZUFkYXB0ZXI8TW9tZW50PiB7XG4gIC8vIE5vdGU6IGFsbCBvZiB0aGUgbWV0aG9kcyB0aGF0IGFjY2VwdCBhIGBNb21lbnRgIGlucHV0IHBhcmFtZXRlciBpbW1lZGlhdGVseSBjYWxsIGB0aGlzLmNsb25lYFxuICAvLyBvbiBpdC4gVGhpcyBpcyB0byBlbnN1cmUgdGhhdCB3ZSdyZSB3b3JraW5nIHdpdGggYSBgTW9tZW50YCB0aGF0IGhhcyB0aGUgY29ycmVjdCBsb2NhbGUgc2V0dGluZ1xuICAvLyB3aGlsZSBhdm9pZGluZyBtdXRhdGluZyB0aGUgb3JpZ2luYWwgb2JqZWN0IHBhc3NlZCB0byB1cy4gSnVzdCBjYWxsaW5nIGAubG9jYWxlKC4uLilgIG9uIHRoZVxuICAvLyBpbnB1dCB3b3VsZCBtdXRhdGUgdGhlIG9iamVjdC5cblxuICBwcml2YXRlIF9sb2NhbGVEYXRhOiB7XG4gICAgZmlyc3REYXlPZldlZWs6IG51bWJlcixcbiAgICBsb25nTW9udGhzOiBzdHJpbmdbXSxcbiAgICBzaG9ydE1vbnRoczogc3RyaW5nW10sXG4gICAgZGF0ZXM6IHN0cmluZ1tdLFxuICAgIGxvbmdEYXlzT2ZXZWVrOiBzdHJpbmdbXSxcbiAgICBzaG9ydERheXNPZldlZWs6IHN0cmluZ1tdLFxuICAgIG5hcnJvd0RheXNPZldlZWs6IHN0cmluZ1tdXG4gIH07XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChNQVRfREFURV9MT0NBTEUpIGRhdGVMb2NhbGU6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9NT01FTlRfREFURV9BREFQVEVSX09QVElPTlMpXG4gICAgcHJpdmF0ZSBfb3B0aW9ucz86IE1hdE1vbWVudERhdGVBZGFwdGVyT3B0aW9ucykge1xuXG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnNldExvY2FsZShkYXRlTG9jYWxlIHx8IG1vbWVudC5sb2NhbGUoKSk7XG4gIH1cblxuICBzZXRMb2NhbGUobG9jYWxlOiBzdHJpbmcpIHtcbiAgICBzdXBlci5zZXRMb2NhbGUobG9jYWxlKTtcblxuICAgIGxldCBtb21lbnRMb2NhbGVEYXRhID0gbW9tZW50LmxvY2FsZURhdGEobG9jYWxlKTtcbiAgICB0aGlzLl9sb2NhbGVEYXRhID0ge1xuICAgICAgZmlyc3REYXlPZldlZWs6IG1vbWVudExvY2FsZURhdGEuZmlyc3REYXlPZldlZWsoKSxcbiAgICAgIGxvbmdNb250aHM6IG1vbWVudExvY2FsZURhdGEubW9udGhzKCksXG4gICAgICBzaG9ydE1vbnRoczogbW9tZW50TG9jYWxlRGF0YS5tb250aHNTaG9ydCgpLFxuICAgICAgZGF0ZXM6IHJhbmdlKDMxLCAoaSkgPT4gdGhpcy5jcmVhdGVEYXRlKDIwMTcsIDAsIGkgKyAxKS5mb3JtYXQoJ0QnKSksXG4gICAgICBsb25nRGF5c09mV2VlazogbW9tZW50TG9jYWxlRGF0YS53ZWVrZGF5cygpLFxuICAgICAgc2hvcnREYXlzT2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLndlZWtkYXlzU2hvcnQoKSxcbiAgICAgIG5hcnJvd0RheXNPZldlZWs6IG1vbWVudExvY2FsZURhdGEud2Vla2RheXNNaW4oKSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0WWVhcihkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLnllYXIoKTtcbiAgfVxuXG4gIGdldE1vbnRoKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkubW9udGgoKTtcbiAgfVxuXG4gIGdldERhdGUoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5kYXRlKCk7XG4gIH1cblxuICBnZXREYXlPZldlZWsoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5kYXkoKTtcbiAgfVxuXG4gIGdldE1vbnRoTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdIHtcbiAgICAvLyBNb21lbnQuanMgZG9lc24ndCBzdXBwb3J0IG5hcnJvdyBtb250aCBuYW1lcywgc28gd2UganVzdCB1c2Ugc2hvcnQgaWYgbmFycm93IGlzIHJlcXVlc3RlZC5cbiAgICByZXR1cm4gc3R5bGUgPT0gJ2xvbmcnID8gdGhpcy5fbG9jYWxlRGF0YS5sb25nTW9udGhzIDogdGhpcy5fbG9jYWxlRGF0YS5zaG9ydE1vbnRocztcbiAgfVxuXG4gIGdldERhdGVOYW1lcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsZURhdGEuZGF0ZXM7XG4gIH1cblxuICBnZXREYXlPZldlZWtOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW10ge1xuICAgIGlmIChzdHlsZSA9PSAnbG9uZycpIHtcbiAgICAgIHJldHVybiB0aGlzLl9sb2NhbGVEYXRhLmxvbmdEYXlzT2ZXZWVrO1xuICAgIH1cbiAgICBpZiAoc3R5bGUgPT0gJ3Nob3J0Jykge1xuICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZURhdGEuc2hvcnREYXlzT2ZXZWVrO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fbG9jYWxlRGF0YS5uYXJyb3dEYXlzT2ZXZWVrO1xuICB9XG5cbiAgZ2V0WWVhck5hbWUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5mb3JtYXQoJ1lZWVknKTtcbiAgfVxuXG4gIGdldEZpcnN0RGF5T2ZXZWVrKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsZURhdGEuZmlyc3REYXlPZldlZWs7XG4gIH1cblxuICBnZXROdW1EYXlzSW5Nb250aChkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmRheXNJbk1vbnRoKCk7XG4gIH1cblxuICBjbG9uZShkYXRlOiBNb21lbnQpOiBNb21lbnQge1xuICAgIHJldHVybiBkYXRlLmNsb25lKCkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgfVxuXG4gIGNyZWF0ZURhdGUoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXRlOiBudW1iZXIpOiBNb21lbnQge1xuICAgIC8vIE1vbWVudC5qcyB3aWxsIGNyZWF0ZSBhbiBpbnZhbGlkIGRhdGUgaWYgYW55IG9mIHRoZSBjb21wb25lbnRzIGFyZSBvdXQgb2YgYm91bmRzLCBidXQgd2VcbiAgICAvLyBleHBsaWNpdGx5IGNoZWNrIGVhY2ggY2FzZSBzbyB3ZSBjYW4gdGhyb3cgbW9yZSBkZXNjcmlwdGl2ZSBlcnJvcnMuXG4gICAgaWYgKG1vbnRoIDwgMCB8fCBtb250aCA+IDExKSB7XG4gICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBtb250aCBpbmRleCBcIiR7bW9udGh9XCIuIE1vbnRoIGluZGV4IGhhcyB0byBiZSBiZXR3ZWVuIDAgYW5kIDExLmApO1xuICAgIH1cblxuICAgIGlmIChkYXRlIDwgMSkge1xuICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIi4gRGF0ZSBoYXMgdG8gYmUgZ3JlYXRlciB0aGFuIDAuYCk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fY3JlYXRlTW9tZW50KHt5ZWFyLCBtb250aCwgZGF0ZX0pLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG5cbiAgICAvLyBJZiB0aGUgcmVzdWx0IGlzbid0IHZhbGlkLCB0aGUgZGF0ZSBtdXN0IGhhdmUgYmVlbiBvdXQgb2YgYm91bmRzIGZvciB0aGlzIG1vbnRoLlxuICAgIGlmICghcmVzdWx0LmlzVmFsaWQoKSkge1xuICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIiBmb3IgbW9udGggd2l0aCBpbmRleCBcIiR7bW9udGh9XCIuYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHRvZGF5KCk6IE1vbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2NyZWF0ZU1vbWVudCgpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gIH1cblxuICBwYXJzZSh2YWx1ZTogYW55LCBwYXJzZUZvcm1hdDogc3RyaW5nIHwgc3RyaW5nW10pOiBNb21lbnQgfCBudWxsIHtcbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY3JlYXRlTW9tZW50KHZhbHVlLCBwYXJzZUZvcm1hdCwgdGhpcy5sb2NhbGUpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWUgPyB0aGlzLl9jcmVhdGVNb21lbnQodmFsdWUpLmxvY2FsZSh0aGlzLmxvY2FsZSkgOiBudWxsO1xuICB9XG5cbiAgZm9ybWF0KGRhdGU6IE1vbWVudCwgZGlzcGxheUZvcm1hdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBkYXRlID0gdGhpcy5jbG9uZShkYXRlKTtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZChkYXRlKSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ01vbWVudERhdGVBZGFwdGVyOiBDYW5ub3QgZm9ybWF0IGludmFsaWQgZGF0ZS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGUuZm9ybWF0KGRpc3BsYXlGb3JtYXQpO1xuICB9XG5cbiAgYWRkQ2FsZW5kYXJZZWFycyhkYXRlOiBNb21lbnQsIHllYXJzOiBudW1iZXIpOiBNb21lbnQge1xuICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmFkZCh7eWVhcnN9KTtcbiAgfVxuXG4gIGFkZENhbGVuZGFyTW9udGhzKGRhdGU6IE1vbWVudCwgbW9udGhzOiBudW1iZXIpOiBNb21lbnQge1xuICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmFkZCh7bW9udGhzfSk7XG4gIH1cblxuICBhZGRDYWxlbmRhckRheXMoZGF0ZTogTW9tZW50LCBkYXlzOiBudW1iZXIpOiBNb21lbnQge1xuICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmFkZCh7ZGF5c30pO1xuICB9XG5cbiAgdG9Jc284NjAxKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZm9ybWF0KCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZ2l2ZW4gdmFsdWUgaWYgZ2l2ZW4gYSB2YWxpZCBNb21lbnQgb3IgbnVsbC4gRGVzZXJpYWxpemVzIHZhbGlkIElTTyA4NjAxIHN0cmluZ3NcbiAgICogKGh0dHBzOi8vd3d3LmlldGYub3JnL3JmYy9yZmMzMzM5LnR4dCkgYW5kIHZhbGlkIERhdGUgb2JqZWN0cyBpbnRvIHZhbGlkIE1vbWVudHMgYW5kIGVtcHR5XG4gICAqIHN0cmluZyBpbnRvIG51bGwuIFJldHVybnMgYW4gaW52YWxpZCBkYXRlIGZvciBhbGwgb3RoZXIgdmFsdWVzLlxuICAgKi9cbiAgZGVzZXJpYWxpemUodmFsdWU6IGFueSk6IE1vbWVudCB8IG51bGwge1xuICAgIGxldCBkYXRlO1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIGRhdGUgPSB0aGlzLl9jcmVhdGVNb21lbnQodmFsdWUpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzRGF0ZUluc3RhbmNlKHZhbHVlKSkge1xuICAgICAgLy8gTm90ZTogYXNzdW1lcyB0aGF0IGNsb25pbmcgYWxzbyBzZXRzIHRoZSBjb3JyZWN0IGxvY2FsZS5cbiAgICAgIHJldHVybiB0aGlzLmNsb25lKHZhbHVlKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBkYXRlID0gdGhpcy5fY3JlYXRlTW9tZW50KHZhbHVlLCBtb21lbnQuSVNPXzg2MDEpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgfVxuICAgIGlmIChkYXRlICYmIHRoaXMuaXNWYWxpZChkYXRlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZU1vbWVudChkYXRlKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgIH1cbiAgICByZXR1cm4gc3VwZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICB9XG5cbiAgaXNEYXRlSW5zdGFuY2Uob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbW9tZW50LmlzTW9tZW50KG9iaik7XG4gIH1cblxuICBpc1ZhbGlkKGRhdGU6IE1vbWVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmlzVmFsaWQoKTtcbiAgfVxuXG4gIGludmFsaWQoKTogTW9tZW50IHtcbiAgICByZXR1cm4gbW9tZW50LmludmFsaWQoKTtcbiAgfVxuXG4gIC8qKiBDcmVhdGVzIGEgTW9tZW50IGluc3RhbmNlIHdoaWxlIHJlc3BlY3RpbmcgdGhlIGN1cnJlbnQgVVRDIHNldHRpbmdzLiAqL1xuICBwcml2YXRlIF9jcmVhdGVNb21lbnQoXG4gICAgZGF0ZTogTW9tZW50SW5wdXQsXG4gICAgZm9ybWF0PzogTW9tZW50Rm9ybWF0U3BlY2lmaWNhdGlvbixcbiAgICBsb2NhbGU/OiBzdHJpbmcsXG4gICk6IE1vbWVudCB7XG4gICAgY29uc3Qge3N0cmljdCwgdXNlVXRjfTogTWF0TW9tZW50RGF0ZUFkYXB0ZXJPcHRpb25zID0gdGhpcy5fb3B0aW9ucyB8fCB7fTtcblxuICAgIHJldHVybiB1c2VVdGNcbiAgICAgID8gbW9tZW50LnV0YyhkYXRlLCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0KVxuICAgICAgOiBtb21lbnQoZGF0ZSwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCk7XG4gIH1cbn1cbiJdfQ==