/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from './moment-date-adapter';
import { MAT_MOMENT_DATE_FORMATS } from './moment-date-formats';
export * from './moment-date-adapter';
export * from './moment-date-formats';
var MomentDateModule = /** @class */ (function () {
    function MomentDateModule() {
    }
    MomentDateModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        {
                            provide: DateAdapter,
                            useClass: MomentDateAdapter,
                            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
                        }
                    ],
                },] }
    ];
    return MomentDateModule;
}());
export { MomentDateModule };
var ɵ0 = MAT_MOMENT_DATE_FORMATS;
var MatMomentDateModule = /** @class */ (function () {
    function MatMomentDateModule() {
    }
    MatMomentDateModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MomentDateModule],
                    providers: [{ provide: MAT_DATE_FORMATS, useValue: ɵ0 }],
                },] }
    ];
    return MatMomentDateModule;
}());
export { MatMomentDateModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtbW9tZW50LWFkYXB0ZXIvYWRhcHRlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdEYsT0FBTyxFQUFDLCtCQUErQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDekYsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFOUQsY0FBYyx1QkFBdUIsQ0FBQztBQUN0QyxjQUFjLHVCQUF1QixDQUFDO0FBRXRDO0lBQUE7SUFTK0IsQ0FBQzs7Z0JBVC9CLFFBQVEsU0FBQztvQkFDUixTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLFdBQVc7NEJBQ3BCLFFBQVEsRUFBRSxpQkFBaUI7NEJBQzNCLElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRSwrQkFBK0IsQ0FBQzt5QkFDekQ7cUJBQ0Y7aUJBQ0Y7O0lBQzhCLHVCQUFDO0NBQUEsQUFUaEMsSUFTZ0M7U0FBbkIsZ0JBQWdCO1NBS3VCLHVCQUF1QjtBQUYzRTtJQUFBO0lBSWtDLENBQUM7O2dCQUpsQyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7b0JBQzNCLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsSUFBeUIsRUFBQyxDQUFDO2lCQUM1RTs7SUFDaUMsMEJBQUM7Q0FBQSxBQUpuQyxJQUltQztTQUF0QixtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RhdGVBZGFwdGVyLCBNQVRfREFURV9GT1JNQVRTLCBNQVRfREFURV9MT0NBTEV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNQVRfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TLCBNb21lbnREYXRlQWRhcHRlcn0gZnJvbSAnLi9tb21lbnQtZGF0ZS1hZGFwdGVyJztcbmltcG9ydCB7TUFUX01PTUVOVF9EQVRFX0ZPUk1BVFN9IGZyb20gJy4vbW9tZW50LWRhdGUtZm9ybWF0cyc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbW9tZW50LWRhdGUtYWRhcHRlcic7XG5leHBvcnQgKiBmcm9tICcuL21vbWVudC1kYXRlLWZvcm1hdHMnO1xuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBEYXRlQWRhcHRlcixcbiAgICAgIHVzZUNsYXNzOiBNb21lbnREYXRlQWRhcHRlcixcbiAgICAgIGRlcHM6IFtNQVRfREFURV9MT0NBTEUsIE1BVF9NT01FTlRfREFURV9BREFQVEVSX09QVElPTlNdXG4gICAgfVxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNb21lbnREYXRlTW9kdWxlIHt9XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01vbWVudERhdGVNb2R1bGVdLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTUFUX0RBVEVfRk9STUFUUywgdXNlVmFsdWU6IE1BVF9NT01FTlRfREFURV9GT1JNQVRTfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdE1vbWVudERhdGVNb2R1bGUge31cbiJdfQ==