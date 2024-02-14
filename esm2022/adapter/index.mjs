/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter, } from './moment-date-adapter';
import { MAT_MOMENT_DATE_FORMATS } from './moment-date-formats';
import * as i0 from "@angular/core";
export * from './moment-date-adapter';
export * from './moment-date-formats';
export class MomentDateModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MomentDateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.0", ngImport: i0, type: MomentDateModule }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MomentDateModule, providers: [
            {
                provide: DateAdapter,
                useClass: MomentDateAdapter,
                deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
            },
        ] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MomentDateModule, decorators: [{
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
export class MatMomentDateModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatMomentDateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.0", ngImport: i0, type: MatMomentDateModule }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatMomentDateModule, providers: [provideMomentDateAdapter()] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatMomentDateModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [provideMomentDateAdapter()],
                }]
        }] });
export function provideMomentDateAdapter(formats = MAT_MOMENT_DATE_FORMATS, options) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtbW9tZW50LWFkYXB0ZXIvYWRhcHRlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFXLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFDTCxXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLGVBQWUsR0FFaEIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQ0wsK0JBQStCLEVBRS9CLGlCQUFpQixHQUNsQixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDOztBQUU5RCxjQUFjLHVCQUF1QixDQUFDO0FBQ3RDLGNBQWMsdUJBQXVCLENBQUM7QUFXdEMsTUFBTSxPQUFPLGdCQUFnQjs4R0FBaEIsZ0JBQWdCOytHQUFoQixnQkFBZ0I7K0dBQWhCLGdCQUFnQixhQVJoQjtZQUNUO2dCQUNFLE9BQU8sRUFBRSxXQUFXO2dCQUNwQixRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixJQUFJLEVBQUUsQ0FBQyxlQUFlLEVBQUUsK0JBQStCLENBQUM7YUFDekQ7U0FDRjs7MkZBRVUsZ0JBQWdCO2tCQVQ1QixRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsV0FBVzs0QkFDcEIsUUFBUSxFQUFFLGlCQUFpQjs0QkFDM0IsSUFBSSxFQUFFLENBQUMsZUFBZSxFQUFFLCtCQUErQixDQUFDO3lCQUN6RDtxQkFDRjtpQkFDRjs7QUFNRCxNQUFNLE9BQU8sbUJBQW1COzhHQUFuQixtQkFBbUI7K0dBQW5CLG1CQUFtQjsrR0FBbkIsbUJBQW1CLGFBRm5CLENBQUMsd0JBQXdCLEVBQUUsQ0FBQzs7MkZBRTVCLG1CQUFtQjtrQkFIL0IsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO2lCQUN4Qzs7QUFHRCxNQUFNLFVBQVUsd0JBQXdCLENBQ3RDLFVBQTBCLHVCQUF1QixFQUNqRCxPQUFxQztJQUVyQyxNQUFNLFNBQVMsR0FBZTtRQUM1QjtZQUNFLE9BQU8sRUFBRSxXQUFXO1lBQ3BCLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsSUFBSSxFQUFFLENBQUMsZUFBZSxFQUFFLCtCQUErQixDQUFDO1NBQ3pEO1FBQ0QsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBQztLQUMvQyxDQUFDO0lBRUYsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNaLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsK0JBQStCLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZSwgUHJvdmlkZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRGF0ZUFkYXB0ZXIsXG4gIE1BVF9EQVRFX0ZPUk1BVFMsXG4gIE1BVF9EQVRFX0xPQ0FMRSxcbiAgTWF0RGF0ZUZvcm1hdHMsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtcbiAgTUFUX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OUyxcbiAgTWF0TW9tZW50RGF0ZUFkYXB0ZXJPcHRpb25zLFxuICBNb21lbnREYXRlQWRhcHRlcixcbn0gZnJvbSAnLi9tb21lbnQtZGF0ZS1hZGFwdGVyJztcbmltcG9ydCB7TUFUX01PTUVOVF9EQVRFX0ZPUk1BVFN9IGZyb20gJy4vbW9tZW50LWRhdGUtZm9ybWF0cyc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbW9tZW50LWRhdGUtYWRhcHRlcic7XG5leHBvcnQgKiBmcm9tICcuL21vbWVudC1kYXRlLWZvcm1hdHMnO1xuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBEYXRlQWRhcHRlcixcbiAgICAgIHVzZUNsYXNzOiBNb21lbnREYXRlQWRhcHRlcixcbiAgICAgIGRlcHM6IFtNQVRfREFURV9MT0NBTEUsIE1BVF9NT01FTlRfREFURV9BREFQVEVSX09QVElPTlNdLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1vbWVudERhdGVNb2R1bGUge31cblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbcHJvdmlkZU1vbWVudERhdGVBZGFwdGVyKCldLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRNb21lbnREYXRlTW9kdWxlIHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlTW9tZW50RGF0ZUFkYXB0ZXIoXG4gIGZvcm1hdHM6IE1hdERhdGVGb3JtYXRzID0gTUFUX01PTUVOVF9EQVRFX0ZPUk1BVFMsXG4gIG9wdGlvbnM/OiBNYXRNb21lbnREYXRlQWRhcHRlck9wdGlvbnMsXG4pOiBQcm92aWRlcltdIHtcbiAgY29uc3QgcHJvdmlkZXJzOiBQcm92aWRlcltdID0gW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IERhdGVBZGFwdGVyLFxuICAgICAgdXNlQ2xhc3M6IE1vbWVudERhdGVBZGFwdGVyLFxuICAgICAgZGVwczogW01BVF9EQVRFX0xPQ0FMRSwgTUFUX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OU10sXG4gICAgfSxcbiAgICB7cHJvdmlkZTogTUFUX0RBVEVfRk9STUFUUywgdXNlVmFsdWU6IGZvcm1hdHN9LFxuICBdO1xuXG4gIGlmIChvcHRpb25zKSB7XG4gICAgcHJvdmlkZXJzLnB1c2goe3Byb3ZpZGU6IE1BVF9NT01FTlRfREFURV9BREFQVEVSX09QVElPTlMsIHVzZVZhbHVlOiBvcHRpb25zfSk7XG4gIH1cblxuICByZXR1cm4gcHJvdmlkZXJzO1xufVxuIl19