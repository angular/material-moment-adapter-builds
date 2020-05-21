/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from './moment-date-adapter';
import { MAT_MOMENT_DATE_FORMATS } from './moment-date-formats';
export * from './moment-date-adapter';
export * from './moment-date-formats';
let MomentDateModule = /** @class */ (() => {
    let MomentDateModule = class MomentDateModule {
    };
    MomentDateModule = __decorate([
        NgModule({
            providers: [
                {
                    provide: DateAdapter,
                    useClass: MomentDateAdapter,
                    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
                }
            ],
        })
    ], MomentDateModule);
    return MomentDateModule;
})();
export { MomentDateModule };
const ɵ0 = MAT_MOMENT_DATE_FORMATS;
let MatMomentDateModule = /** @class */ (() => {
    let MatMomentDateModule = class MatMomentDateModule {
    };
    MatMomentDateModule = __decorate([
        NgModule({
            imports: [MomentDateModule],
            providers: [{ provide: MAT_DATE_FORMATS, useValue: ɵ0 }],
        })
    ], MatMomentDateModule);
    return MatMomentDateModule;
})();
export { MatMomentDateModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtbW9tZW50LWFkYXB0ZXIvYWRhcHRlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3RGLE9BQU8sRUFBQywrQkFBK0IsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3pGLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRTlELGNBQWMsdUJBQXVCLENBQUM7QUFDdEMsY0FBYyx1QkFBdUIsQ0FBQztBQVd0QztJQUFBLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0tBQUcsQ0FBQTtJQUFuQixnQkFBZ0I7UUFUNUIsUUFBUSxDQUFDO1lBQ1IsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxXQUFXO29CQUNwQixRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixJQUFJLEVBQUUsQ0FBQyxlQUFlLEVBQUUsK0JBQStCLENBQUM7aUJBQ3pEO2FBQ0Y7U0FDRixDQUFDO09BQ1csZ0JBQWdCLENBQUc7SUFBRCx1QkFBQztLQUFBO1NBQW5CLGdCQUFnQjtXQUt1Qix1QkFBdUI7QUFFM0U7SUFBQSxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtLQUFHLENBQUE7SUFBdEIsbUJBQW1CO1FBSi9CLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO1lBQzNCLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsSUFBeUIsRUFBQyxDQUFDO1NBQzVFLENBQUM7T0FDVyxtQkFBbUIsQ0FBRztJQUFELDBCQUFDO0tBQUE7U0FBdEIsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEYXRlQWRhcHRlciwgTUFUX0RBVEVfRk9STUFUUywgTUFUX0RBVEVfTE9DQUxFfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TUFUX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OUywgTW9tZW50RGF0ZUFkYXB0ZXJ9IGZyb20gJy4vbW9tZW50LWRhdGUtYWRhcHRlcic7XG5pbXBvcnQge01BVF9NT01FTlRfREFURV9GT1JNQVRTfSBmcm9tICcuL21vbWVudC1kYXRlLWZvcm1hdHMnO1xuXG5leHBvcnQgKiBmcm9tICcuL21vbWVudC1kYXRlLWFkYXB0ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9tb21lbnQtZGF0ZS1mb3JtYXRzJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogRGF0ZUFkYXB0ZXIsXG4gICAgICB1c2VDbGFzczogTW9tZW50RGF0ZUFkYXB0ZXIsXG4gICAgICBkZXBzOiBbTUFUX0RBVEVfTE9DQUxFLCBNQVRfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TXVxuICAgIH1cbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTW9tZW50RGF0ZU1vZHVsZSB7fVxuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNb21lbnREYXRlTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1BVF9EQVRFX0ZPUk1BVFMsIHVzZVZhbHVlOiBNQVRfTU9NRU5UX0RBVEVfRk9STUFUU31dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRNb21lbnREYXRlTW9kdWxlIHt9XG4iXX0=