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
import * as i0 from "@angular/core";
export * from './moment-date-adapter';
export * from './moment-date-formats';
export class MomentDateModule {
}
MomentDateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: MomentDateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MomentDateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: MomentDateModule });
MomentDateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: MomentDateModule, providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: MomentDateModule, decorators: [{
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
}
MatMomentDateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: MatMomentDateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatMomentDateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: MatMomentDateModule, imports: [MomentDateModule] });
MatMomentDateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: MatMomentDateModule, providers: [{ provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }], imports: [[MomentDateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: MatMomentDateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MomentDateModule],
                    providers: [{ provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtbW9tZW50LWFkYXB0ZXIvYWRhcHRlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdEYsT0FBTyxFQUFDLCtCQUErQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDekYsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sdUJBQXVCLENBQUM7O0FBRTlELGNBQWMsdUJBQXVCLENBQUM7QUFDdEMsY0FBYyx1QkFBdUIsQ0FBQztBQVd0QyxNQUFNLE9BQU8sZ0JBQWdCOzs2R0FBaEIsZ0JBQWdCOzhHQUFoQixnQkFBZ0I7OEdBQWhCLGdCQUFnQixhQVJoQjtRQUNUO1lBQ0UsT0FBTyxFQUFFLFdBQVc7WUFDcEIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixJQUFJLEVBQUUsQ0FBQyxlQUFlLEVBQUUsK0JBQStCLENBQUM7U0FDekQ7S0FDRjsyRkFFVSxnQkFBZ0I7a0JBVDVCLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxXQUFXOzRCQUNwQixRQUFRLEVBQUUsaUJBQWlCOzRCQUMzQixJQUFJLEVBQUUsQ0FBQyxlQUFlLEVBQUUsK0JBQStCLENBQUM7eUJBQ3pEO3FCQUNGO2lCQUNGOztBQU9ELE1BQU0sT0FBTyxtQkFBbUI7O2dIQUFuQixtQkFBbUI7aUhBQW5CLG1CQUFtQixZQU5uQixnQkFBZ0I7aUhBTWhCLG1CQUFtQixhQUZuQixDQUFDLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBQyxDQUFDLFlBRGxFLENBQUMsZ0JBQWdCLENBQUM7MkZBR2hCLG1CQUFtQjtrQkFKL0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDM0IsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFDLENBQUM7aUJBQzVFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEYXRlQWRhcHRlciwgTUFUX0RBVEVfRk9STUFUUywgTUFUX0RBVEVfTE9DQUxFfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TUFUX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OUywgTW9tZW50RGF0ZUFkYXB0ZXJ9IGZyb20gJy4vbW9tZW50LWRhdGUtYWRhcHRlcic7XG5pbXBvcnQge01BVF9NT01FTlRfREFURV9GT1JNQVRTfSBmcm9tICcuL21vbWVudC1kYXRlLWZvcm1hdHMnO1xuXG5leHBvcnQgKiBmcm9tICcuL21vbWVudC1kYXRlLWFkYXB0ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9tb21lbnQtZGF0ZS1mb3JtYXRzJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogRGF0ZUFkYXB0ZXIsXG4gICAgICB1c2VDbGFzczogTW9tZW50RGF0ZUFkYXB0ZXIsXG4gICAgICBkZXBzOiBbTUFUX0RBVEVfTE9DQUxFLCBNQVRfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TXSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNb21lbnREYXRlTW9kdWxlIHt9XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNb21lbnREYXRlTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1BVF9EQVRFX0ZPUk1BVFMsIHVzZVZhbHVlOiBNQVRfTU9NRU5UX0RBVEVfRk9STUFUU31dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRNb21lbnREYXRlTW9kdWxlIHt9XG4iXX0=