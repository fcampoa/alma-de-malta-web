import { Injectable } from "@angular/core";
import * as SaleActions from "../actions/sales.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { ApiResponse } from "../../models/response";
import { SaleService } from "../../services/sale.service";
import { Sale } from "../../models/sale";
import { SalesDashboardService } from "../../services/sales-dashboard.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class SalesEffects {
    getSalesEffect$;
    getSaleByIdEffect$;
    createSaleEffect$;
    updateSaleEffect$;

    // Sale Dashboard Effects
    getSaleDashboardsEffect$;
    getSaleDashboardByIdEffect$;
    createSaleDashboardEffect$;
    updateSaleDashboardEffect$;
    constructor(private saleService: SaleService, private saleDashboardService: SalesDashboardService, private actions$: Actions, private router: Router) {
        this.getSalesEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(SaleActions.GetSales),
                switchMap(() =>
                    this.saleService.get().pipe(
                        map((response: ApiResponse) => {
                            return SaleActions.SetSales({ sales: response.body as Sale[] });
                        }
                        ),
                        catchError((error) =>
                            of(SaleActions.SetSales({ sales: [] }))
                        )
                    )
                )
            );
        });
        this.getSaleByIdEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(SaleActions.GetSaleById),
                switchMap((action) =>
                    this.saleService.getById(action.id).pipe(
                        map((response: ApiResponse) => {
                            return SaleActions.SetSelectedSale({ sale: response.body as Sale });
                        }
                        ),
                        catchError((error) =>
                            of(SaleActions.SetSelectedSale({ sale: null }))
                        )
                    )
                )
            );
        });
        this.createSaleEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(SaleActions.CreateSale),
                switchMap((action) =>
                    this.saleService.create(action.sale).pipe(
                        map((response: ApiResponse) => {
                            return SaleActions.SetSelectedSale({ sale: { id: response.body, ...action.sale } });
                        }
                        ),
                        catchError((error) =>
                            of(SaleActions.SetSelectedSale({ sale: null }))
                        )
                    )
                )
            );
        });
        this.updateSaleEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(SaleActions.UpdateSale),
                switchMap((action) =>
                    this.saleService.update(action.sale, action.sale.id).pipe(
                        map((response: ApiResponse) => {
                            return SaleActions.SetSelectedSale({ sale: action.sale });
                        }
                        ),
                        catchError((error) =>
                            of(SaleActions.SetSelectedSale({ sale: null }))
                        )
                    )
                )
            );
        });
        // Sale Dashboard Effects
        this.getSaleDashboardsEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(SaleActions.GetSaleDashboards),
                switchMap(() =>
                    this.saleDashboardService.get().pipe(
                        map((response: ApiResponse) => {
                            return SaleActions.SetSaleDashboards({ dashboards: response.body });
                        }
                        ),
                        catchError((error) =>
                            of(SaleActions.SetSaleDashboards({ dashboards: [] }))
                        )
                    )
                )
            );
        });

        this.getSaleDashboardByIdEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(SaleActions.GetSaleDashboardById),
                switchMap((action) =>
                    this.saleDashboardService.getById(action.id).pipe(
                        map((response: ApiResponse) => {
                            return SaleActions.SetSelectedSaleDashboard({ dashboard: response.body });
                        }
                        ),
                        catchError((error) =>
                            of(SaleActions.SetSelectedSaleDashboard({ dashboard: null }))
                        )
                    )
                )
            );
        });

        this.createSaleDashboardEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(SaleActions.CreateSaleDashboard),
                switchMap((action) =>
                    this.saleDashboardService.create(action.dashboard).pipe(
                        map((response: ApiResponse) => {
                            this.router.navigate(['/admin/sales/dashboard']);
                            return SaleActions.SetSelectedSaleDashboard({ dashboard: { id: response.body, ...action.dashboard } });
                        }
                        ),
                        catchError((error) =>
                            of(SaleActions.SetSelectedSaleDashboard({ dashboard: null }))
                        )
                    )
                )
            );
        });

        this.updateSaleDashboardEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(SaleActions.UpdateSaleDashboard),
                switchMap((action) =>
                    this.saleDashboardService.update(action.dashboard, action.dashboard.id).pipe(
                        map((response: ApiResponse) => {
                            return SaleActions.SetSelectedSaleDashboard({ dashboard: action.dashboard });
                        }
                        ),
                        catchError((error) =>
                            of(SaleActions.SetSelectedSaleDashboard({ dashboard: null }))
                        )
                    )
                )
            );
        });
    }
}