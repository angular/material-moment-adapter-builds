import * as i0 from '@angular/core';
import { InjectionToken, inject, Injectable, NgModule } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import * as _rollupMoment from 'moment';
import _rollupMoment__default from 'moment';

const moment = _rollupMoment__default || _rollupMoment;
/** InjectionToken for moment date adapter to configure options. */
const MAT_MOMENT_DATE_ADAPTER_OPTIONS = new InjectionToken('MAT_MOMENT_DATE_ADAPTER_OPTIONS', {
    providedIn: 'root',
    factory: MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY,
});
/**
 * @docs-private
 * @deprecated No longer used, will be removed.
 * @breaking-change 21.0.0
 */
function MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY() {
    return {
        useUtc: false,
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
class MomentDateAdapter extends DateAdapter {
    _options = inject(MAT_MOMENT_DATE_ADAPTER_OPTIONS, {
        optional: true,
    });
    // Note: all of the methods that accept a `Moment` input parameter immediately call `this.clone`
    // on it. This is to ensure that we're working with a `Moment` that has the correct locale setting
    // while avoiding mutating the original object passed to us. Just calling `.locale(...)` on the
    // input would mutate the object.
    _localeData;
    constructor() {
        super();
        const dateLocale = inject(MAT_DATE_LOCALE, { optional: true });
        this.setLocale(dateLocale || moment.locale());
    }
    setLocale(locale) {
        super.setLocale(locale);
        let momentLocaleData = moment.localeData(locale);
        this._localeData = {
            firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
            longMonths: momentLocaleData.months(),
            shortMonths: momentLocaleData.monthsShort(),
            dates: range(31, i => this.createDate(2017, 0, i + 1).format('D')),
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
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            if (month < 0 || month > 11) {
                throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
            }
            if (date < 1) {
                throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
            }
        }
        const result = this._createMoment({ year, month, date }).locale(this.locale);
        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid() && (typeof ngDevMode === 'undefined' || ngDevMode)) {
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
        if (!this.isValid(date) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
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
    setTime(target, hours, minutes, seconds) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            if (hours < 0 || hours > 23) {
                throw Error(`Invalid hours "${hours}". Hours value must be between 0 and 23.`);
            }
            if (minutes < 0 || minutes > 59) {
                throw Error(`Invalid minutes "${minutes}". Minutes value must be between 0 and 59.`);
            }
            if (seconds < 0 || seconds > 59) {
                throw Error(`Invalid seconds "${seconds}". Seconds value must be between 0 and 59.`);
            }
        }
        return this.clone(target).set({ hours, minutes, seconds, milliseconds: 0 });
    }
    getHours(date) {
        return date.hours();
    }
    getMinutes(date) {
        return date.minutes();
    }
    getSeconds(date) {
        return date.seconds();
    }
    parseTime(value, parseFormat) {
        return this.parse(value, parseFormat);
    }
    addSeconds(date, amount) {
        return this.clone(date).add({ seconds: amount });
    }
    /** Creates a Moment instance while respecting the current UTC settings. */
    _createMoment(date, format, locale) {
        const { strict, useUtc } = this._options || {};
        return useUtc ? moment.utc(date, format, locale, strict) : moment(date, format, locale, strict);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.0", ngImport: i0, type: MomentDateAdapter, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.0.0", ngImport: i0, type: MomentDateAdapter });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.0", ngImport: i0, type: MomentDateAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: () => [] });

const MAT_MOMENT_DATE_FORMATS = {
    parse: {
        dateInput: 'l',
        timeInput: 'LT',
    },
    display: {
        dateInput: 'l',
        timeInput: 'LT',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
        timeOptionLabel: 'LT',
    },
};

class MomentDateModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.0", ngImport: i0, type: MomentDateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.0.0", ngImport: i0, type: MomentDateModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.0.0", ngImport: i0, type: MomentDateModule, providers: [
            {
                provide: DateAdapter,
                useClass: MomentDateAdapter,
                deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
            },
        ] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.0", ngImport: i0, type: MomentDateModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        {
                            provide: DateAdapter,
                            useClass: MomentDateAdapter,
                            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
                        },
                    ],
                }]
        }] });
class MatMomentDateModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.0", ngImport: i0, type: MatMomentDateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.0.0", ngImport: i0, type: MatMomentDateModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.0.0", ngImport: i0, type: MatMomentDateModule, providers: [provideMomentDateAdapter()] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.0", ngImport: i0, type: MatMomentDateModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [provideMomentDateAdapter()],
                }]
        }] });
function provideMomentDateAdapter(formats = MAT_MOMENT_DATE_FORMATS, options) {
    const providers = [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },
        { provide: MAT_DATE_FORMATS, useValue: formats },
    ];
    if (options) {
        providers.push({ provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: options });
    }
    return providers;
}

export { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY, MAT_MOMENT_DATE_FORMATS, MatMomentDateModule, MomentDateAdapter, MomentDateModule, provideMomentDateAdapter };
//# sourceMappingURL=material-moment-adapter.mjs.map
