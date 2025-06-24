import { Injectable } from "@angular/core";
import { PaymentMethodState } from "../states-definition/payment-method.state";
import { Store } from "@ngrx/store";
import * as PaymentMethodSelectors from "../selectors/payment-methods.selectors";
import * as PaymentMethodActions from "../actions/payment-methods.actions";
import { Observable } from "rxjs";
import { PaymentMethod } from "../../models/payment-method";

@Injectable({ providedIn: 'root' })
export class PaymentMethodFacade {
    private paymentMethodsLoaded = false;
    constructor(private store: Store<PaymentMethodState>) { }

    getPaymentMethods(): void {
        this.store.dispatch(PaymentMethodActions.GetPaymentMethods());
        this.paymentMethodsLoaded = true;
    }

    paymentMethods(): Observable<PaymentMethod[]> {
        if (!this.paymentMethodsLoaded) {
            this.getPaymentMethods();
        }
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
        this.paymentMethodsLoaded = false;
    }

    updatePaymentMethod(paymentMethod: PaymentMethod): void {
        this.store.dispatch(PaymentMethodActions.UpdatePaymentMethod({ paymentMethod }));
        this.paymentMethodsLoaded = false; // Reset payment methods loaded state to ensure fresh data
    }
}