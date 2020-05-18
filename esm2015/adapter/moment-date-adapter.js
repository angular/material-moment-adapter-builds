/**
 * @fileoverview added by tsickle
 * Generated from: src/material-moment-adapter/adapter/moment-date-adapter.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
/** @type {?} */
const moment = _rollupMoment || _moment;
/**
 * Configurable options for {\@see MomentDateAdapter}.
 * @record
 */
export function MatMomentDateAdapterOptions() { }
if (false) {
    /**
     * When enabled, the dates have to match the format exactly.
     * See https://momentjs.com/guides/#/parsing/strict-mode/.
     * @type {?|undefined}
     */
    MatMomentDateAdapterOptions.prototype.strict;
    /**
     * Turns the use of utc dates on or off.
     * Changing this will change how Angular Material components like DatePicker output dates.
     * {\@default false}
     * @type {?|undefined}
     */
    MatMomentDateAdapterOptions.prototype.useUtc;
}
/**
 * InjectionToken for moment date adapter to configure options.
 * @type {?}
 */
export const MAT_MOMENT_DATE_ADAPTER_OPTIONS = new InjectionToken('MAT_MOMENT_DATE_ADAPTER_OPTIONS', {
    providedIn: 'root',
    factory: MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY
});
/**
 * \@docs-private
 * @return {?}
 */
export function MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY() {
    return {
        useUtc: false
    };
}
/**
 * Creates an array and fills it with values.
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range(length, valueFunction) {
    /** @type {?} */
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
/**
 * Adapts Moment.js Dates for use with Angular Material.
 */
let MomentDateAdapter = /** @class */ (() => {
    /**
     * Adapts Moment.js Dates for use with Angular Material.
     */
    class MomentDateAdapter extends DateAdapter {
        /**
         * @param {?} dateLocale
         * @param {?=} _options
         */
        constructor(dateLocale, _options) {
            super();
            this._options = _options;
            this.setLocale(dateLocale || moment.locale());
        }
        /**
         * @param {?} locale
         * @return {?}
         */
        setLocale(locale) {
            super.setLocale(locale);
            /** @type {?} */
            let momentLocaleData = moment.localeData(locale);
            this._localeData = {
                firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
                longMonths: momentLocaleData.months(),
                shortMonths: momentLocaleData.monthsShort(),
                dates: range(31, (/**
                 * @param {?} i
                 * @return {?}
                 */
                (i) => this.createDate(2017, 0, i + 1).format('D'))),
                longDaysOfWeek: momentLocaleData.weekdays(),
                shortDaysOfWeek: momentLocaleData.weekdaysShort(),
                narrowDaysOfWeek: momentLocaleData.weekdaysMin(),
            };
        }
        /**
         * @param {?} date
         * @return {?}
         */
        getYear(date) {
            return this.clone(date).year();
        }
        /**
         * @param {?} date
         * @return {?}
         */
        getMonth(date) {
            return this.clone(date).month();
        }
        /**
         * @param {?} date
         * @return {?}
         */
        getDate(date) {
            return this.clone(date).date();
        }
        /**
         * @param {?} date
         * @return {?}
         */
        getDayOfWeek(date) {
            return this.clone(date).day();
        }
        /**
         * @param {?} style
         * @return {?}
         */
        getMonthNames(style) {
            // Moment.js doesn't support narrow month names, so we just use short if narrow is requested.
            return style == 'long' ? this._localeData.longMonths : this._localeData.shortMonths;
        }
        /**
         * @return {?}
         */
        getDateNames() {
            return this._localeData.dates;
        }
        /**
         * @param {?} style
         * @return {?}
         */
        getDayOfWeekNames(style) {
            if (style == 'long') {
                return this._localeData.longDaysOfWeek;
            }
            if (style == 'short') {
                return this._localeData.shortDaysOfWeek;
            }
            return this._localeData.narrowDaysOfWeek;
        }
        /**
         * @param {?} date
         * @return {?}
         */
        getYearName(date) {
            return this.clone(date).format('YYYY');
        }
        /**
         * @return {?}
         */
        getFirstDayOfWeek() {
            return this._localeData.firstDayOfWeek;
        }
        /**
         * @param {?} date
         * @return {?}
         */
        getNumDaysInMonth(date) {
            return this.clone(date).daysInMonth();
        }
        /**
         * @param {?} date
         * @return {?}
         */
        clone(date) {
            return date.clone().locale(this.locale);
        }
        /**
         * @param {?} year
         * @param {?} month
         * @param {?} date
         * @return {?}
         */
        createDate(year, month, date) {
            // Moment.js will create an invalid date if any of the components are out of bounds, but we
            // explicitly check each case so we can throw more descriptive errors.
            if (month < 0 || month > 11) {
                throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
            }
            if (date < 1) {
                throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
            }
            /** @type {?} */
            const result = this._createMoment({ year, month, date }).locale(this.locale);
            // If the result isn't valid, the date must have been out of bounds for this month.
            if (!result.isValid()) {
                throw Error(`Invalid date "${date}" for month with index "${month}".`);
            }
            return result;
        }
        /**
         * @return {?}
         */
        today() {
            return this._createMoment().locale(this.locale);
        }
        /**
         * @param {?} value
         * @param {?} parseFormat
         * @return {?}
         */
        parse(value, parseFormat) {
            if (value && typeof value == 'string') {
                return this._createMoment(value, parseFormat, this.locale);
            }
            return value ? this._createMoment(value).locale(this.locale) : null;
        }
        /**
         * @param {?} date
         * @param {?} displayFormat
         * @return {?}
         */
        format(date, displayFormat) {
            date = this.clone(date);
            if (!this.isValid(date)) {
                throw Error('MomentDateAdapter: Cannot format invalid date.');
            }
            return date.format(displayFormat);
        }
        /**
         * @param {?} date
         * @param {?} years
         * @return {?}
         */
        addCalendarYears(date, years) {
            return this.clone(date).add({ years });
        }
        /**
         * @param {?} date
         * @param {?} months
         * @return {?}
         */
        addCalendarMonths(date, months) {
            return this.clone(date).add({ months });
        }
        /**
         * @param {?} date
         * @param {?} days
         * @return {?}
         */
        addCalendarDays(date, days) {
            return this.clone(date).add({ days });
        }
        /**
         * @param {?} date
         * @return {?}
         */
        toIso8601(date) {
            return this.clone(date).format();
        }
        /**
         * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
         * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
         * string into null. Returns an invalid date for all other values.
         * @param {?} value
         * @return {?}
         */
        deserialize(value) {
            /** @type {?} */
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
        /**
         * @param {?} obj
         * @return {?}
         */
        isDateInstance(obj) {
            return moment.isMoment(obj);
        }
        /**
         * @param {?} date
         * @return {?}
         */
        isValid(date) {
            return this.clone(date).isValid();
        }
        /**
         * @return {?}
         */
        invalid() {
            return moment.invalid();
        }
        /**
         * Creates a Moment instance while respecting the current UTC settings.
         * @private
         * @param {?} date
         * @param {?=} format
         * @param {?=} locale
         * @return {?}
         */
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    MomentDateAdapter.prototype._localeData;
    /**
     * @type {?}
     * @private
     */
    MomentDateAdapter.prototype._options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1tb21lbnQtYWRhcHRlci9hZGFwdGVyL21vbWVudC1kYXRlLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUMsV0FBVyxFQUFFLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7QUFNcEUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O0FBRWxDLE9BQU8sRUFBQyxPQUFPLElBQUksYUFBYSxFQUFpRCxNQUFNLFFBQVEsQ0FBQzs7TUFFMUYsTUFBTSxHQUFHLGFBQWEsSUFBSSxPQUFPOzs7OztBQUd2QyxpREFjQzs7Ozs7OztJQVJDLDZDQUFpQjs7Ozs7OztJQU9qQiw2Q0FBaUI7Ozs7OztBQUluQixNQUFNLE9BQU8sK0JBQStCLEdBQUcsSUFBSSxjQUFjLENBQy9ELGlDQUFpQyxFQUFFO0lBQ2pDLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSx1Q0FBdUM7Q0FDbkQsQ0FBQzs7Ozs7QUFJRixNQUFNLFVBQVUsdUNBQXVDO0lBQ3JELE9BQU87UUFDTCxNQUFNLEVBQUUsS0FBSztLQUNkLENBQUM7QUFDSixDQUFDOzs7Ozs7OztBQUlELFNBQVMsS0FBSyxDQUFJLE1BQWMsRUFBRSxhQUFtQzs7VUFDN0QsV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMvQixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ25DO0lBQ0QsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQzs7OztBQUlEOzs7O0lBQUEsTUFDYSxpQkFBa0IsU0FBUSxXQUFtQjs7Ozs7UUFnQnhELFlBQWlELFVBQWtCLEVBRXpELFFBQXNDO1lBRTlDLEtBQUssRUFBRSxDQUFDO1lBRkEsYUFBUSxHQUFSLFFBQVEsQ0FBOEI7WUFHOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDaEQsQ0FBQzs7Ozs7UUFFRCxTQUFTLENBQUMsTUFBYztZQUN0QixLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztnQkFFcEIsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7WUFDaEQsSUFBSSxDQUFDLFdBQVcsR0FBRztnQkFDakIsY0FBYyxFQUFFLGdCQUFnQixDQUFDLGNBQWMsRUFBRTtnQkFDakQsVUFBVSxFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtnQkFDckMsV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRTtnQkFDM0MsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFOzs7O2dCQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBQztnQkFDcEUsY0FBYyxFQUFFLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtnQkFDM0MsZUFBZSxFQUFFLGdCQUFnQixDQUFDLGFBQWEsRUFBRTtnQkFDakQsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFO2FBQ2pELENBQUM7UUFDSixDQUFDOzs7OztRQUVELE9BQU8sQ0FBQyxJQUFZO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxDQUFDOzs7OztRQUVELFFBQVEsQ0FBQyxJQUFZO1lBQ25CLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsQyxDQUFDOzs7OztRQUVELE9BQU8sQ0FBQyxJQUFZO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxDQUFDOzs7OztRQUVELFlBQVksQ0FBQyxJQUFZO1lBQ3ZCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoQyxDQUFDOzs7OztRQUVELGFBQWEsQ0FBQyxLQUFrQztZQUM5Qyw2RkFBNkY7WUFDN0YsT0FBTyxLQUFLLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7UUFDdEYsQ0FBQzs7OztRQUVELFlBQVk7WUFDVixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1FBQ2hDLENBQUM7Ozs7O1FBRUQsaUJBQWlCLENBQUMsS0FBa0M7WUFDbEQsSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFO2dCQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDO2FBQ3hDO1lBQ0QsSUFBSSxLQUFLLElBQUksT0FBTyxFQUFFO2dCQUNwQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDO2FBQ3pDO1lBQ0QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDO1FBQzNDLENBQUM7Ozs7O1FBRUQsV0FBVyxDQUFDLElBQVk7WUFDdEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxDQUFDOzs7O1FBRUQsaUJBQWlCO1lBQ2YsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQztRQUN6QyxDQUFDOzs7OztRQUVELGlCQUFpQixDQUFDLElBQVk7WUFDNUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hDLENBQUM7Ozs7O1FBRUQsS0FBSyxDQUFDLElBQVk7WUFDaEIsT0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQyxDQUFDOzs7Ozs7O1FBRUQsVUFBVSxDQUFDLElBQVksRUFBRSxLQUFhLEVBQUUsSUFBWTtZQUNsRCwyRkFBMkY7WUFDM0Ysc0VBQXNFO1lBQ3RFLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRSxFQUFFO2dCQUMzQixNQUFNLEtBQUssQ0FBQyx3QkFBd0IsS0FBSyw0Q0FBNEMsQ0FBQyxDQUFDO2FBQ3hGO1lBRUQsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO2dCQUNaLE1BQU0sS0FBSyxDQUFDLGlCQUFpQixJQUFJLG1DQUFtQyxDQUFDLENBQUM7YUFDdkU7O2tCQUVLLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBRTFFLG1GQUFtRjtZQUNuRixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNyQixNQUFNLEtBQUssQ0FBQyxpQkFBaUIsSUFBSSwyQkFBMkIsS0FBSyxJQUFJLENBQUMsQ0FBQzthQUN4RTtZQUVELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7Ozs7UUFFRCxLQUFLO1lBQ0gsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRCxDQUFDOzs7Ozs7UUFFRCxLQUFLLENBQUMsS0FBVSxFQUFFLFdBQThCO1lBQzlDLElBQUksS0FBSyxJQUFJLE9BQU8sS0FBSyxJQUFJLFFBQVEsRUFBRTtnQkFDckMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzVEO1lBQ0QsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3RFLENBQUM7Ozs7OztRQUVELE1BQU0sQ0FBQyxJQUFZLEVBQUUsYUFBcUI7WUFDeEMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3ZCLE1BQU0sS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7YUFDL0Q7WUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEMsQ0FBQzs7Ozs7O1FBRUQsZ0JBQWdCLENBQUMsSUFBWSxFQUFFLEtBQWE7WUFDMUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7UUFDdkMsQ0FBQzs7Ozs7O1FBRUQsaUJBQWlCLENBQUMsSUFBWSxFQUFFLE1BQWM7WUFDNUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7UUFDeEMsQ0FBQzs7Ozs7O1FBRUQsZUFBZSxDQUFDLElBQVksRUFBRSxJQUFZO1lBQ3hDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7Ozs7O1FBRUQsU0FBUyxDQUFDLElBQVk7WUFDcEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ25DLENBQUM7Ozs7Ozs7O1FBT0QsV0FBVyxDQUFDLEtBQVU7O2dCQUNoQixJQUFJO1lBQ1IsSUFBSSxLQUFLLFlBQVksSUFBSSxFQUFFO2dCQUN6QixJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3REO2lCQUFNLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDckMsMkRBQTJEO2dCQUMzRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDMUI7WUFDRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixPQUFPLElBQUksQ0FBQztpQkFDYjtnQkFDRCxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDdkU7WUFDRCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM5QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNyRDtZQUNELE9BQU8sS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxDQUFDOzs7OztRQUVELGNBQWMsQ0FBQyxHQUFRO1lBQ3JCLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixDQUFDOzs7OztRQUVELE9BQU8sQ0FBQyxJQUFZO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNwQyxDQUFDOzs7O1FBRUQsT0FBTztZQUNMLE9BQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFCLENBQUM7Ozs7Ozs7OztRQUdPLGFBQWEsQ0FDbkIsSUFBaUIsRUFDakIsTUFBa0MsRUFDbEMsTUFBZTtrQkFFVCxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUMsR0FBZ0MsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFO1lBRXpFLE9BQU8sTUFBTTtnQkFDWCxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7Z0JBQzFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0MsQ0FBQzs7O2dCQW5NRixVQUFVOzs7OzZDQWlCSSxRQUFRLFlBQUksTUFBTSxTQUFDLGVBQWU7Z0RBQzVDLFFBQVEsWUFBSSxNQUFNLFNBQUMsK0JBQStCOztJQWtMdkQsd0JBQUM7S0FBQTtTQW5NWSxpQkFBaUI7Ozs7OztJQU01Qix3Q0FRRTs7Ozs7SUFHQSxxQ0FDOEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsLCBJbmplY3Rpb25Ub2tlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RhdGVBZGFwdGVyLCBNQVRfREFURV9MT0NBTEV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuLy8gRGVwZW5kaW5nIG9uIHdoZXRoZXIgcm9sbHVwIGlzIHVzZWQsIG1vbWVudCBuZWVkcyB0byBiZSBpbXBvcnRlZCBkaWZmZXJlbnRseS5cbi8vIFNpbmNlIE1vbWVudC5qcyBkb2Vzbid0IGhhdmUgYSBkZWZhdWx0IGV4cG9ydCwgd2Ugbm9ybWFsbHkgbmVlZCB0byBpbXBvcnQgdXNpbmcgdGhlIGAqIGFzYFxuLy8gc3ludGF4LiBIb3dldmVyLCByb2xsdXAgY3JlYXRlcyBhIHN5bnRoZXRpYyBkZWZhdWx0IG1vZHVsZSBhbmQgd2UgdGh1cyBuZWVkIHRvIGltcG9ydCBpdCB1c2luZ1xuLy8gdGhlIGBkZWZhdWx0IGFzYCBzeW50YXguXG4vLyBUT0RPKG1tYWxlcmJhKTogU2VlIGlmIHdlIGNhbiBjbGVhbiB0aGlzIHVwIGF0IHNvbWUgcG9pbnQuXG5pbXBvcnQgKiBhcyBfbW9tZW50IGZyb20gJ21vbWVudCc7XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZHVwbGljYXRlLWltcG9ydHNcbmltcG9ydCB7ZGVmYXVsdCBhcyBfcm9sbHVwTW9tZW50LCBNb21lbnQsIE1vbWVudEZvcm1hdFNwZWNpZmljYXRpb24sIE1vbWVudElucHV0fSBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBfcm9sbHVwTW9tZW50IHx8IF9tb21lbnQ7XG5cbi8qKiBDb25maWd1cmFibGUgb3B0aW9ucyBmb3Ige0BzZWUgTW9tZW50RGF0ZUFkYXB0ZXJ9LiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRNb21lbnREYXRlQWRhcHRlck9wdGlvbnMge1xuXG4gIC8qKlxuICAgKiBXaGVuIGVuYWJsZWQsIHRoZSBkYXRlcyBoYXZlIHRvIG1hdGNoIHRoZSBmb3JtYXQgZXhhY3RseS5cbiAgICogU2VlIGh0dHBzOi8vbW9tZW50anMuY29tL2d1aWRlcy8jL3BhcnNpbmcvc3RyaWN0LW1vZGUvLlxuICAgKi9cbiAgc3RyaWN0PzogYm9vbGVhbjtcblxuICAvKipcbiAgICogVHVybnMgdGhlIHVzZSBvZiB1dGMgZGF0ZXMgb24gb3Igb2ZmLlxuICAgKiBDaGFuZ2luZyB0aGlzIHdpbGwgY2hhbmdlIGhvdyBBbmd1bGFyIE1hdGVyaWFsIGNvbXBvbmVudHMgbGlrZSBEYXRlUGlja2VyIG91dHB1dCBkYXRlcy5cbiAgICoge0BkZWZhdWx0IGZhbHNlfVxuICAgKi9cbiAgdXNlVXRjPzogYm9vbGVhbjtcbn1cblxuLyoqIEluamVjdGlvblRva2VuIGZvciBtb21lbnQgZGF0ZSBhZGFwdGVyIHRvIGNvbmZpZ3VyZSBvcHRpb25zLiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9NT01FTlRfREFURV9BREFQVEVSX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48TWF0TW9tZW50RGF0ZUFkYXB0ZXJPcHRpb25zPihcbiAgJ01BVF9NT01FTlRfREFURV9BREFQVEVSX09QVElPTlMnLCB7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgIGZhY3Rvcnk6IE1BVF9NT01FTlRfREFURV9BREFQVEVSX09QVElPTlNfRkFDVE9SWVxufSk7XG5cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBNQVRfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TX0ZBQ1RPUlkoKTogTWF0TW9tZW50RGF0ZUFkYXB0ZXJPcHRpb25zIHtcbiAgcmV0dXJuIHtcbiAgICB1c2VVdGM6IGZhbHNlXG4gIH07XG59XG5cblxuLyoqIENyZWF0ZXMgYW4gYXJyYXkgYW5kIGZpbGxzIGl0IHdpdGggdmFsdWVzLiAqL1xuZnVuY3Rpb24gcmFuZ2U8VD4obGVuZ3RoOiBudW1iZXIsIHZhbHVlRnVuY3Rpb246IChpbmRleDogbnVtYmVyKSA9PiBUKTogVFtdIHtcbiAgY29uc3QgdmFsdWVzQXJyYXkgPSBBcnJheShsZW5ndGgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgdmFsdWVzQXJyYXlbaV0gPSB2YWx1ZUZ1bmN0aW9uKGkpO1xuICB9XG4gIHJldHVybiB2YWx1ZXNBcnJheTtcbn1cblxuXG4vKiogQWRhcHRzIE1vbWVudC5qcyBEYXRlcyBmb3IgdXNlIHdpdGggQW5ndWxhciBNYXRlcmlhbC4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb21lbnREYXRlQWRhcHRlciBleHRlbmRzIERhdGVBZGFwdGVyPE1vbWVudD4ge1xuICAvLyBOb3RlOiBhbGwgb2YgdGhlIG1ldGhvZHMgdGhhdCBhY2NlcHQgYSBgTW9tZW50YCBpbnB1dCBwYXJhbWV0ZXIgaW1tZWRpYXRlbHkgY2FsbCBgdGhpcy5jbG9uZWBcbiAgLy8gb24gaXQuIFRoaXMgaXMgdG8gZW5zdXJlIHRoYXQgd2UncmUgd29ya2luZyB3aXRoIGEgYE1vbWVudGAgdGhhdCBoYXMgdGhlIGNvcnJlY3QgbG9jYWxlIHNldHRpbmdcbiAgLy8gd2hpbGUgYXZvaWRpbmcgbXV0YXRpbmcgdGhlIG9yaWdpbmFsIG9iamVjdCBwYXNzZWQgdG8gdXMuIEp1c3QgY2FsbGluZyBgLmxvY2FsZSguLi4pYCBvbiB0aGVcbiAgLy8gaW5wdXQgd291bGQgbXV0YXRlIHRoZSBvYmplY3QuXG5cbiAgcHJpdmF0ZSBfbG9jYWxlRGF0YToge1xuICAgIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIsXG4gICAgbG9uZ01vbnRoczogc3RyaW5nW10sXG4gICAgc2hvcnRNb250aHM6IHN0cmluZ1tdLFxuICAgIGRhdGVzOiBzdHJpbmdbXSxcbiAgICBsb25nRGF5c09mV2Vlazogc3RyaW5nW10sXG4gICAgc2hvcnREYXlzT2ZXZWVrOiBzdHJpbmdbXSxcbiAgICBuYXJyb3dEYXlzT2ZXZWVrOiBzdHJpbmdbXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX0RBVEVfTE9DQUxFKSBkYXRlTG9jYWxlOiBzdHJpbmcsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TKVxuICAgIHByaXZhdGUgX29wdGlvbnM/OiBNYXRNb21lbnREYXRlQWRhcHRlck9wdGlvbnMpIHtcblxuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zZXRMb2NhbGUoZGF0ZUxvY2FsZSB8fCBtb21lbnQubG9jYWxlKCkpO1xuICB9XG5cbiAgc2V0TG9jYWxlKGxvY2FsZTogc3RyaW5nKSB7XG4gICAgc3VwZXIuc2V0TG9jYWxlKGxvY2FsZSk7XG5cbiAgICBsZXQgbW9tZW50TG9jYWxlRGF0YSA9IG1vbWVudC5sb2NhbGVEYXRhKGxvY2FsZSk7XG4gICAgdGhpcy5fbG9jYWxlRGF0YSA9IHtcbiAgICAgIGZpcnN0RGF5T2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLmZpcnN0RGF5T2ZXZWVrKCksXG4gICAgICBsb25nTW9udGhzOiBtb21lbnRMb2NhbGVEYXRhLm1vbnRocygpLFxuICAgICAgc2hvcnRNb250aHM6IG1vbWVudExvY2FsZURhdGEubW9udGhzU2hvcnQoKSxcbiAgICAgIGRhdGVzOiByYW5nZSgzMSwgKGkpID0+IHRoaXMuY3JlYXRlRGF0ZSgyMDE3LCAwLCBpICsgMSkuZm9ybWF0KCdEJykpLFxuICAgICAgbG9uZ0RheXNPZldlZWs6IG1vbWVudExvY2FsZURhdGEud2Vla2RheXMoKSxcbiAgICAgIHNob3J0RGF5c09mV2VlazogbW9tZW50TG9jYWxlRGF0YS53ZWVrZGF5c1Nob3J0KCksXG4gICAgICBuYXJyb3dEYXlzT2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLndlZWtkYXlzTWluKCksXG4gICAgfTtcbiAgfVxuXG4gIGdldFllYXIoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS55ZWFyKCk7XG4gIH1cblxuICBnZXRNb250aChkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLm1vbnRoKCk7XG4gIH1cblxuICBnZXREYXRlKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZGF0ZSgpO1xuICB9XG5cbiAgZ2V0RGF5T2ZXZWVrKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZGF5KCk7XG4gIH1cblxuICBnZXRNb250aE5hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XG4gICAgLy8gTW9tZW50LmpzIGRvZXNuJ3Qgc3VwcG9ydCBuYXJyb3cgbW9udGggbmFtZXMsIHNvIHdlIGp1c3QgdXNlIHNob3J0IGlmIG5hcnJvdyBpcyByZXF1ZXN0ZWQuXG4gICAgcmV0dXJuIHN0eWxlID09ICdsb25nJyA/IHRoaXMuX2xvY2FsZURhdGEubG9uZ01vbnRocyA6IHRoaXMuX2xvY2FsZURhdGEuc2hvcnRNb250aHM7XG4gIH1cblxuICBnZXREYXRlTmFtZXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9sb2NhbGVEYXRhLmRhdGVzO1xuICB9XG5cbiAgZ2V0RGF5T2ZXZWVrTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdIHtcbiAgICBpZiAoc3R5bGUgPT0gJ2xvbmcnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbG9jYWxlRGF0YS5sb25nRGF5c09mV2VlaztcbiAgICB9XG4gICAgaWYgKHN0eWxlID09ICdzaG9ydCcpIHtcbiAgICAgIHJldHVybiB0aGlzLl9sb2NhbGVEYXRhLnNob3J0RGF5c09mV2VlaztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsZURhdGEubmFycm93RGF5c09mV2VlaztcbiAgfVxuXG4gIGdldFllYXJOYW1lKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZm9ybWF0KCdZWVlZJyk7XG4gIH1cblxuICBnZXRGaXJzdERheU9mV2VlaygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9sb2NhbGVEYXRhLmZpcnN0RGF5T2ZXZWVrO1xuICB9XG5cbiAgZ2V0TnVtRGF5c0luTW9udGgoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5kYXlzSW5Nb250aCgpO1xuICB9XG5cbiAgY2xvbmUoZGF0ZTogTW9tZW50KTogTW9tZW50IHtcbiAgICByZXR1cm4gZGF0ZS5jbG9uZSgpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gIH1cblxuICBjcmVhdGVEYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF0ZTogbnVtYmVyKTogTW9tZW50IHtcbiAgICAvLyBNb21lbnQuanMgd2lsbCBjcmVhdGUgYW4gaW52YWxpZCBkYXRlIGlmIGFueSBvZiB0aGUgY29tcG9uZW50cyBhcmUgb3V0IG9mIGJvdW5kcywgYnV0IHdlXG4gICAgLy8gZXhwbGljaXRseSBjaGVjayBlYWNoIGNhc2Ugc28gd2UgY2FuIHRocm93IG1vcmUgZGVzY3JpcHRpdmUgZXJyb3JzLlxuICAgIGlmIChtb250aCA8IDAgfHwgbW9udGggPiAxMSkge1xuICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgbW9udGggaW5kZXggXCIke21vbnRofVwiLiBNb250aCBpbmRleCBoYXMgdG8gYmUgYmV0d2VlbiAwIGFuZCAxMS5gKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0ZSA8IDEpIHtcbiAgICAgIHRocm93IEVycm9yKGBJbnZhbGlkIGRhdGUgXCIke2RhdGV9XCIuIERhdGUgaGFzIHRvIGJlIGdyZWF0ZXIgdGhhbiAwLmApO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX2NyZWF0ZU1vbWVudCh7eWVhciwgbW9udGgsIGRhdGV9KS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuXG4gICAgLy8gSWYgdGhlIHJlc3VsdCBpc24ndCB2YWxpZCwgdGhlIGRhdGUgbXVzdCBoYXZlIGJlZW4gb3V0IG9mIGJvdW5kcyBmb3IgdGhpcyBtb250aC5cbiAgICBpZiAoIXJlc3VsdC5pc1ZhbGlkKCkpIHtcbiAgICAgIHRocm93IEVycm9yKGBJbnZhbGlkIGRhdGUgXCIke2RhdGV9XCIgZm9yIG1vbnRoIHdpdGggaW5kZXggXCIke21vbnRofVwiLmApO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB0b2RheSgpOiBNb21lbnQge1xuICAgIHJldHVybiB0aGlzLl9jcmVhdGVNb21lbnQoKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICB9XG5cbiAgcGFyc2UodmFsdWU6IGFueSwgcGFyc2VGb3JtYXQ6IHN0cmluZyB8IHN0cmluZ1tdKTogTW9tZW50IHwgbnVsbCB7XG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZU1vbWVudCh2YWx1ZSwgcGFyc2VGb3JtYXQsIHRoaXMubG9jYWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlID8gdGhpcy5fY3JlYXRlTW9tZW50KHZhbHVlKS5sb2NhbGUodGhpcy5sb2NhbGUpIDogbnVsbDtcbiAgfVxuXG4gIGZvcm1hdChkYXRlOiBNb21lbnQsIGRpc3BsYXlGb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgZGF0ZSA9IHRoaXMuY2xvbmUoZGF0ZSk7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgIHRocm93IEVycm9yKCdNb21lbnREYXRlQWRhcHRlcjogQ2Fubm90IGZvcm1hdCBpbnZhbGlkIGRhdGUuJyk7XG4gICAgfVxuICAgIHJldHVybiBkYXRlLmZvcm1hdChkaXNwbGF5Rm9ybWF0KTtcbiAgfVxuXG4gIGFkZENhbGVuZGFyWWVhcnMoZGF0ZTogTW9tZW50LCB5ZWFyczogbnVtYmVyKTogTW9tZW50IHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5hZGQoe3llYXJzfSk7XG4gIH1cblxuICBhZGRDYWxlbmRhck1vbnRocyhkYXRlOiBNb21lbnQsIG1vbnRoczogbnVtYmVyKTogTW9tZW50IHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5hZGQoe21vbnRoc30pO1xuICB9XG5cbiAgYWRkQ2FsZW5kYXJEYXlzKGRhdGU6IE1vbWVudCwgZGF5czogbnVtYmVyKTogTW9tZW50IHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5hZGQoe2RheXN9KTtcbiAgfVxuXG4gIHRvSXNvODYwMShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmZvcm1hdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGdpdmVuIHZhbHVlIGlmIGdpdmVuIGEgdmFsaWQgTW9tZW50IG9yIG51bGwuIERlc2VyaWFsaXplcyB2YWxpZCBJU08gODYwMSBzdHJpbmdzXG4gICAqIChodHRwczovL3d3dy5pZXRmLm9yZy9yZmMvcmZjMzMzOS50eHQpIGFuZCB2YWxpZCBEYXRlIG9iamVjdHMgaW50byB2YWxpZCBNb21lbnRzIGFuZCBlbXB0eVxuICAgKiBzdHJpbmcgaW50byBudWxsLiBSZXR1cm5zIGFuIGludmFsaWQgZGF0ZSBmb3IgYWxsIG90aGVyIHZhbHVlcy5cbiAgICovXG4gIGRlc2VyaWFsaXplKHZhbHVlOiBhbnkpOiBNb21lbnQgfCBudWxsIHtcbiAgICBsZXQgZGF0ZTtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICBkYXRlID0gdGhpcy5fY3JlYXRlTW9tZW50KHZhbHVlKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc0RhdGVJbnN0YW5jZSh2YWx1ZSkpIHtcbiAgICAgIC8vIE5vdGU6IGFzc3VtZXMgdGhhdCBjbG9uaW5nIGFsc28gc2V0cyB0aGUgY29ycmVjdCBsb2NhbGUuXG4gICAgICByZXR1cm4gdGhpcy5jbG9uZSh2YWx1ZSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgZGF0ZSA9IHRoaXMuX2NyZWF0ZU1vbWVudCh2YWx1ZSwgbW9tZW50LklTT184NjAxKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgIH1cbiAgICBpZiAoZGF0ZSAmJiB0aGlzLmlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVNb21lbnQoZGF0ZSkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1cGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgfVxuXG4gIGlzRGF0ZUluc3RhbmNlKG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG1vbWVudC5pc01vbWVudChvYmopO1xuICB9XG5cbiAgaXNWYWxpZChkYXRlOiBNb21lbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5pc1ZhbGlkKCk7XG4gIH1cblxuICBpbnZhbGlkKCk6IE1vbWVudCB7XG4gICAgcmV0dXJuIG1vbWVudC5pbnZhbGlkKCk7XG4gIH1cblxuICAvKiogQ3JlYXRlcyBhIE1vbWVudCBpbnN0YW5jZSB3aGlsZSByZXNwZWN0aW5nIHRoZSBjdXJyZW50IFVUQyBzZXR0aW5ncy4gKi9cbiAgcHJpdmF0ZSBfY3JlYXRlTW9tZW50KFxuICAgIGRhdGU6IE1vbWVudElucHV0LFxuICAgIGZvcm1hdD86IE1vbWVudEZvcm1hdFNwZWNpZmljYXRpb24sXG4gICAgbG9jYWxlPzogc3RyaW5nLFxuICApOiBNb21lbnQge1xuICAgIGNvbnN0IHtzdHJpY3QsIHVzZVV0Y306IE1hdE1vbWVudERhdGVBZGFwdGVyT3B0aW9ucyA9IHRoaXMuX29wdGlvbnMgfHwge307XG5cbiAgICByZXR1cm4gdXNlVXRjXG4gICAgICA/IG1vbWVudC51dGMoZGF0ZSwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdClcbiAgICAgIDogbW9tZW50KGRhdGUsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QpO1xuICB9XG59XG4iXX0=