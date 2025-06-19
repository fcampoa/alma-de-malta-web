import { paymentMethodsFeatureKey } from "../features-keys";
import { createAction, props } from "@ngrx/store";
import { PaymentMethod } from "../../models/payment-method";

export const prefix = `${paymentMethodsFeatureKey} [payment methods]`;

export const GetPaymentMethods = createAction(
  `${prefix} Get Payment Methods`
);

export const SetPaymentMethods = createAction(
  `${prefix} Set Payment Methods`,
  props<{ paymentMethods: PaymentMethod[] }>()
);

export const GetPaymentMethodById = createAction(
  `${prefix} Get Payment Method By Id`,
  props<{ id: string }>()
);

export const SetSelectedPaymentMethod = createAction(
  `${prefix} Set Selected Payment Method`,
  props<{ paymentMethod: PaymentMethod | null }>()
);

export const CreatePaymentMethod = createAction(
  `${prefix} Create Payment Method`,
  props<{ paymentMethod: PaymentMethod }>()
);

export const UpdatePaymentMethod = createAction(
  `${prefix} Update Payment Method`,
  props<{ paymentMethod: PaymentMethod }>()
);