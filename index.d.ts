import * as i0 from '@angular/core';
import { InjectionToken, Provider } from '@angular/core';
import { DateAdapter, MatDateFormats } from '@angular/material/core';
import { Moment } from 'moment';

/** Configurable options for MomentDateAdapter. */
interface MatMomentDateAdapterOptions {
    /**
     * When enabled, the dates have to match the format exactly.
     * See https://momentjs.com/guides/#/parsing/strict-mode/.
     */
    strict?: boolean;
    /**
     * Turns the use of utc dates on or off.
     * Changing this will change how Angular Material components like DatePicker output dates.
     * Defaults to `false`.
     */
    useUtc?: boolean;
}
/** InjectionToken for moment date adapter to configure options. */
declare const MAT_MOMENT_DATE_ADAPTER_OPTIONS: InjectionToken<MatMomentDateAdapterOptions>;
/**
 * @docs-private
 * @deprecated No longer used, will be removed.
 * @breaking-change 21.0.0
 */
declare function MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY(): MatMomentDateAdapterOptions;
/** Adapts Moment.js Dates for use with Angular Material. */
declare class MomentDateAdapter extends DateAdapter<Moment> {
    private _options;
    private _localeData;
    constructor(...args: unknown[]);
    setLocale(locale: string): void;
    getYear(date: Moment): number;
    getMonth(date: Moment): number;
    getDate(date: Moment): number;
    getDayOfWeek(date: Moment): number;
    getMonthNames(style: 'long' | 'short' | 'narrow'): string[];
    getDateNames(): string[];
    getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];
    getYearName(date: Moment): string;
    getFirstDayOfWeek(): number;
    getNumDaysInMonth(date: Moment): number;
    clone(date: Moment): Moment;
    createDate(year: number, month: number, date: number): Moment;
    today(): Moment;
    parse(value: unknown, parseFormat: string | string[]): Moment | null;
    format(date: Moment, displayFormat: string): string;
    addCalendarYears(date: Moment, years: number): Moment;
    addCalendarMonths(date: Moment, months: number): Moment;
    addCalendarDays(date: Moment, days: number): Moment;
    toIso8601(date: Moment): string;
    /**
     * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
     * string into null. Returns an invalid date for all other values.
     */
    deserialize(value: unknown): Moment | null;
    isDateInstance(obj: unknown): obj is Moment;
    isValid(date: Moment): boolean;
    invalid(): Moment;
    setTime(target: Moment, hours: number, minutes: number, seconds: number): Moment;
    getHours(date: Moment): number;
    getMinutes(date: Moment): number;
    getSeconds(date: Moment): number;
    parseTime(value: unknown, parseFormat: string | string[]): Moment | null;
    addSeconds(date: Moment, amount: number): Moment;
    /** Creates a Moment instance while respecting the current UTC settings. */
    private _createMoment;
    static ɵfac: i0.ɵɵFactoryDeclaration<MomentDateAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MomentDateAdapter>;
}

declare const MAT_MOMENT_DATE_FORMATS: MatDateFormats;

declare class MomentDateModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MomentDateModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MomentDateModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MomentDateModule>;
}
declare class MatMomentDateModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatMomentDateModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatMomentDateModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatMomentDateModule>;
}
declare function provideMomentDateAdapter(formats?: MatDateFormats, options?: MatMomentDateAdapterOptions): Provider[];

export { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY, MAT_MOMENT_DATE_FORMATS, MatMomentDateModule, MomentDateAdapter, MomentDateModule, provideMomentDateAdapter };
export type { MatMomentDateAdapterOptions };
