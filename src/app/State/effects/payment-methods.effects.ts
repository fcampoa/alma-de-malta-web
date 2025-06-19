import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import * as PaymentMethodActions from "../actions/payment-methods.actions";
import { ApiResponse } from "../../models/response";
import { PaymentMethodService } from "../../services/payment-method.service";
import { PaymentMethod } from "../../models/payment-method";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class PaymentMethodsEffects {
    getPaymentMethodsEffect$;
    getPaymentMethodByIdEffect$;
    createPaymentMethodEffect$;
    updatePaymentMethodEffect$;
    constructor(private paymentMethodService: PaymentMethodService, private actions$: Actions, private router: Router) {
        this.getPaymentMethodsEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(PaymentMethodActions.GetPaymentMethods),
                switchMap(() =>
                    this.paymentMethodService.get().pipe(
                        map((response: ApiResponse) => {
                            return PaymentMethodActions.SetPaymentMethods({ paymentMethods: response.body as PaymentMethod[] });
                        }
                        ),
                        catchError((error) =>
                            of(PaymentMethodActions.SetPaymentMethods({ paymentMethods: [] }))
                        )
                    )
                )
            );
        });
        this.getPaymentMethodByIdEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(PaymentMethodActions.GetPaymentMethodById),
                switchMap((action) =>
                    this.paymentMethodService.getById(action.id).pipe(
                        map((response: ApiResponse) => {
                            return PaymentMethodActions.SetSelectedPaymentMethod({ paymentMethod: response.body as PaymentMethod });
                        }
                        ),
                        catchError((error) =>
                            of(PaymentMethodActions.SetSelectedPaymentMethod({ paymentMethod: null }))
                        )
                    )
                )
            );
        });
        this.createPaymentMethodEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(PaymentMethodActions.CreatePaymentMethod),
                switchMap((action) =>
                    this.paymentMethodService.create(action.paymentMethod).pipe(
                        map((response: ApiResponse) => {
                            this.router.navigate(['/admin/payment-methods']);
                            return PaymentMethodActions.SetSelectedPaymentMethod({ paymentMethod: { id: response.body, ...action.paymentMethod } });
                        }
                        ),
                        catchError((error) =>
                            of(PaymentMethodActions.SetSelectedPaymentMethod({ paymentMethod: null }))
                        )
                    )
                )
            );
        });
        this.updatePaymentMethodEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(PaymentMethodActions.UpdatePaymentMethod),
                switchMap((action) =>
                    this.paymentMethodService.update(action.paymentMethod, action.paymentMethod.id).pipe(
                        map((response: ApiResponse) => {
                            return PaymentMethodActions.SetSelectedPaymentMethod({ paymentMethod: action.paymentMethod });
                        }
                        ),
                        catchError((error) =>
                            of(PaymentMethodActions.SetSelectedPaymentMethod({ paymentMethod: null }))
                        )
                    )
                )
            );
        });
    }
}