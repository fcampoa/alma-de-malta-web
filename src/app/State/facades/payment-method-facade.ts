import { Injectable } from "@angular/core";
import { PaymentMethodState } from "../states-definition/payment-method.state";
import { Store } from "@ngrx/store";
import * as PaymentMethodSelectors from "../selectors/payment-methods.selectors";
import * as PaymentMethodActions from "../actions/payment-methods.actions";
import { Observable } from "rxjs";
import { PaymentMethod } from "../../models/payment-method";

@Injectable({ providedIn: 'root' })
export class PaymentMethodFacade {
    constructor(private store: Store<PaymentMethodState>) { }

    getPaymentMethods(): void {
        this.store.dispatch(PaymentMethodActions.GetPaymentMethods());
    }

    paymentMethods(): Observable<PaymentMethod[]> {
        return this.store.select(PaymentMethodSelectors.GetPaymentMethods);
    }

    getPaymentMethodById(id: any): void {
        this.store.dispatch(PaymentMethodActions.GetPaymentMethodById({ id }));
    }

    getSelectedPaymentMethod(): Observable<PaymentMethod | null> {
        return this.store.select(PaymentMethodSelectors.GetSelectedPaymentMethod);
    }

    setSelectedPaymentMethod(paymentMethod: PaymentMethod | null): void {
        this.store.dispatch(PaymentMethodActions.SetSelectedPaymentMethod({ paymentMethod }));
    }

    addPaymentMethod(paymentMethod: PaymentMethod): void {
        this.store.dispatch(PaymentMethodActions.CreatePaymentMethod({ paymentMethod }));
    }
}