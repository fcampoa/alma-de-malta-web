import { Injectable } from "@angular/core";
import * as SaleActions from "../actions/sales.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { ApiResponse } from "../../models/response";
import { SaleService } from "../../services/sale.service";
import { Sale } from "../../models/sale";

@Injectable({
    providedIn: 'root'
})
export class SalesEffects {
    getSalesEffect$;
    getSaleByIdEffect$;
    createSaleEffect$;
    updateSaleEffect$;    
    constructor(private saleService: SaleService, private actions$: Actions) {
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
    }
}