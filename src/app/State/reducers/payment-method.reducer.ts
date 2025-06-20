import { createReducer, on } from "@ngrx/store";
import { PaymentMethodState } from "../states-definition/payment-method.state";
import * as PaymentActions from "../actions/payment-methods.actions";

export const initialState: PaymentMethodState = {
    paymentMethodsList: [],
    selectedPaymentMethod: null,
};

export const PaymentMethodsReducer = createReducer<PaymentMethodState>(
    initialState,
    on(PaymentActions.SetPaymentMethods, (state, { paymentMethods }) => ({
        ...state,
        paymentMethodsList: paymentMethods,
    })),
    on(PaymentActions.SetSelectedPaymentMethod, (state, { paymentMethod }) => ({
        ...state,
        selectedPaymentMethod: paymentMethod,
    })),
);