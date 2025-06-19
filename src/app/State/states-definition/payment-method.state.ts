import { PaymentMethod } from "../../models/payment-method";

export interface PaymentMethodState {
    paymentMethodsList: PaymentMethod[];
    selectedPaymentMethod: PaymentMethod | null;
}

export interface PaymentMethodStateFeature {
    paymentMethods: PaymentMethodState;
}