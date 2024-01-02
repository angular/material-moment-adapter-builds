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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0-next.5", ngImport: i0, type: MomentDateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.1.0-next.5", ngImport: i0, type: MomentDateModule }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.1.0-next.5", ngImport: i0, type: MomentDateModule, providers: [
            {
                provide: DateAdapter,
                useClass: MomentDateAdapter,
                deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
            },
        ] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0-next.5", ngImport: i0, type: MomentDateModule, decorators: [{
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0-next.5", ngImport: i0, type: MatMomentDateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.1.0-next.5", ngImport: i0, type: MatMomentDateModule, imports: [MomentDateModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.1.0-next.5", ngImport: i0, type: MatMomentDateModule, providers: [{ provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }], imports: [MomentDateModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0-next.5", ngImport: i0, type: MatMomentDateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MomentDateModule],
                    providers: [{ provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtbW9tZW50LWFkYXB0ZXIvYWRhcHRlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFXLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFDTCxXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLGVBQWUsR0FFaEIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQ0wsK0JBQStCLEVBRS9CLGlCQUFpQixHQUNsQixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDOztBQUU5RCxjQUFjLHVCQUF1QixDQUFDO0FBQ3RDLGNBQWMsdUJBQXVCLENBQUM7QUFXdEMsTUFBTSxPQUFPLGdCQUFnQjtxSEFBaEIsZ0JBQWdCO3NIQUFoQixnQkFBZ0I7c0hBQWhCLGdCQUFnQixhQVJoQjtZQUNUO2dCQUNFLE9BQU8sRUFBRSxXQUFXO2dCQUNwQixRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixJQUFJLEVBQUUsQ0FBQyxlQUFlLEVBQUUsK0JBQStCLENBQUM7YUFDekQ7U0FDRjs7a0dBRVUsZ0JBQWdCO2tCQVQ1QixRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsV0FBVzs0QkFDcEIsUUFBUSxFQUFFLGlCQUFpQjs0QkFDM0IsSUFBSSxFQUFFLENBQUMsZUFBZSxFQUFFLCtCQUErQixDQUFDO3lCQUN6RDtxQkFDRjtpQkFDRjs7QUFPRCxNQUFNLE9BQU8sbUJBQW1CO3FIQUFuQixtQkFBbUI7c0hBQW5CLG1CQUFtQixZQU5uQixnQkFBZ0I7c0hBTWhCLG1CQUFtQixhQUZuQixDQUFDLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBQyxDQUFDLFlBRGpFLGdCQUFnQjs7a0dBR2YsbUJBQW1CO2tCQUovQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO29CQUMzQixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsdUJBQXVCLEVBQUMsQ0FBQztpQkFDNUU7O0FBR0QsTUFBTSxVQUFVLHdCQUF3QixDQUN0QyxVQUEwQix1QkFBdUIsRUFDakQsT0FBcUM7SUFFckMsTUFBTSxTQUFTLEdBQWU7UUFDNUI7WUFDRSxPQUFPLEVBQUUsV0FBVztZQUNwQixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRSwrQkFBK0IsQ0FBQztTQUN6RDtRQUNELEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUM7S0FDL0MsQ0FBQztJQUVGLElBQUksT0FBTyxFQUFFLENBQUM7UUFDWixTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLCtCQUErQixFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdNb2R1bGUsIFByb3ZpZGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIERhdGVBZGFwdGVyLFxuICBNQVRfREFURV9GT1JNQVRTLFxuICBNQVRfREFURV9MT0NBTEUsXG4gIE1hdERhdGVGb3JtYXRzLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7XG4gIE1BVF9NT01FTlRfREFURV9BREFQVEVSX09QVElPTlMsXG4gIE1hdE1vbWVudERhdGVBZGFwdGVyT3B0aW9ucyxcbiAgTW9tZW50RGF0ZUFkYXB0ZXIsXG59IGZyb20gJy4vbW9tZW50LWRhdGUtYWRhcHRlcic7XG5pbXBvcnQge01BVF9NT01FTlRfREFURV9GT1JNQVRTfSBmcm9tICcuL21vbWVudC1kYXRlLWZvcm1hdHMnO1xuXG5leHBvcnQgKiBmcm9tICcuL21vbWVudC1kYXRlLWFkYXB0ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9tb21lbnQtZGF0ZS1mb3JtYXRzJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogRGF0ZUFkYXB0ZXIsXG4gICAgICB1c2VDbGFzczogTW9tZW50RGF0ZUFkYXB0ZXIsXG4gICAgICBkZXBzOiBbTUFUX0RBVEVfTE9DQUxFLCBNQVRfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TXSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNb21lbnREYXRlTW9kdWxlIHt9XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNb21lbnREYXRlTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1BVF9EQVRFX0ZPUk1BVFMsIHVzZVZhbHVlOiBNQVRfTU9NRU5UX0RBVEVfRk9STUFUU31dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRNb21lbnREYXRlTW9kdWxlIHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlTW9tZW50RGF0ZUFkYXB0ZXIoXG4gIGZvcm1hdHM6IE1hdERhdGVGb3JtYXRzID0gTUFUX01PTUVOVF9EQVRFX0ZPUk1BVFMsXG4gIG9wdGlvbnM/OiBNYXRNb21lbnREYXRlQWRhcHRlck9wdGlvbnMsXG4pOiBQcm92aWRlcltdIHtcbiAgY29uc3QgcHJvdmlkZXJzOiBQcm92aWRlcltdID0gW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IERhdGVBZGFwdGVyLFxuICAgICAgdXNlQ2xhc3M6IE1vbWVudERhdGVBZGFwdGVyLFxuICAgICAgZGVwczogW01BVF9EQVRFX0xPQ0FMRSwgTUFUX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OU10sXG4gICAgfSxcbiAgICB7cHJvdmlkZTogTUFUX0RBVEVfRk9STUFUUywgdXNlVmFsdWU6IGZvcm1hdHN9LFxuICBdO1xuXG4gIGlmIChvcHRpb25zKSB7XG4gICAgcHJvdmlkZXJzLnB1c2goe3Byb3ZpZGU6IE1BVF9NT01FTlRfREFURV9BREFQVEVSX09QVElPTlMsIHVzZVZhbHVlOiBvcHRpb25zfSk7XG4gIH1cblxuICByZXR1cm4gcHJvdmlkZXJzO1xufVxuIl19