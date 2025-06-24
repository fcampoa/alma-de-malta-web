import { Injectable } from "@angular/core";
import * as SaleActions from "../actions/sales.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { ApiResponse } from "@models/response";
import { SaleService, NotificationService, SalesDashboardService, PurchaseOrderNumberPrefixService } from "@services/index";
import { Sale, SaleDashboard } from "@models/sale";
import { Router } from "@angular/router";
import { SaleFacade } from "@facades/sale-facade";

@Injectable({
    providedIn: 'root'
})
export class SalesEffects {
    // Sales Effects
    getSalesEffect$;
    getSaleByIdEffect$;
    createSaleEffect$;
    updateSaleEffect$;

    // Sale Dashboard Effects
    getSaleDashboardsEffect$;
    getSaleDashboardByIdEffect$;
    createSaleDashboardEffect$;
    updateSaleDashboardEffect$;

    // Purchase Order Number Prefix Effects
    getPurchaseOrderNumberPrefixesEffect$;
    getPurchaseOrderNumberPrefixByIdEffect$;
    createPurchaseOrderNumberPrefixEffect$;
    updatePurchaseOrderNumberPrefixEffect$;

    constructor(private saleService: SaleService, 
                private saleDashboardService: SalesDashboardService,
                private purchaseOrderNumberPrefixService: PurchaseOrderNumberPrefixService,
                private actions$: Actions,
                private saleFacade: SaleFacade,
                private notificationService: NotificationService,
                private router: Router) {
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
                            this.notificationService.success("Sale created successfully");
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
                            let dashboard = (response.body as SaleDashboard[]).find(dashboard => dashboard.isDefault) || null;
                                if (dashboard) {
                                    this.saleFacade.getSaleDashboardById(dashboard.id as string);
                                }
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
                            this.router.navigate(['/admin/sales/dashboard']);
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
        // Purchase Order Number Prefix Effects
        this.getPurchaseOrderNumberPrefixesEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(SaleActions.GetPurchaseOrderNumberPrefixes),
                switchMap(() =>
                    this.purchaseOrderNumberPrefixService.get().pipe(
                        map((response: ApiResponse) => {
                            return SaleActions.SetPurchaseOrderNumberPrefixes({ prefixes: response.body });
                        }
                        ),
                        catchError((error) =>
                            of(SaleActions.SetPurchaseOrderNumberPrefixes({ prefixes: [] }))
                        )
                    )
                )
            );
        });
        this.getPurchaseOrderNumberPrefixByIdEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(SaleActions.GetPurchaseOrderNumberPrefixById),
                switchMap((action) =>
                    this.purchaseOrderNumberPrefixService.getById(action.id).pipe(
                        map((response: ApiResponse) => {
                            return SaleActions.SetPurchaseOrderNumberPrefix({ prefix: response.body });
                        }
                        ),
                        catchError((error) =>
                            of(SaleActions.SetPurchaseOrderNumberPrefix({ prefix: null }))
                        )
                    )
                )
            );
        });
        this.createPurchaseOrderNumberPrefixEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(SaleActions.CreatePurchaseOrderNumberPrefix),
                switchMap((action) =>
                    this.purchaseOrderNumberPrefixService.create(action.prefix).pipe(
                        map((response: ApiResponse) => {
                            this.router.navigate(['/admin/sales/prefixes']);
                            return SaleActions.SetPurchaseOrderNumberPrefix({ prefix: { id: response.body, ...action.prefix } });
                        }
                        ),
                        catchError((error) =>
                            of(SaleActions.SetPurchaseOrderNumberPrefix({ prefix: null }))
                        )
                    )
                )
            );
        });

        this.updatePurchaseOrderNumberPrefixEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(SaleActions.UpdatePurchaseOrderNumberPrefix),
                switchMap((action) =>
                    this.purchaseOrderNumberPrefixService.update(action.prefix, action.prefix.id).pipe(
                        map((response: ApiResponse) => {
                            this.router.navigate(['/admin/sales/prefixes']);
                            return SaleActions.SetPurchaseOrderNumberPrefix({ prefix: action.prefix });
                        }
                        ),
                        catchError((error) =>
                            of(SaleActions.SetPurchaseOrderNumberPrefix({ prefix: null }))
                        )
                    )
                )
            );
        });
    }
}