import { createSelector } from "@ngrx/store";
import { GetPaymentMethodFeature } from "./get-features";

const GetFeature = createSelector(GetPaymentMethodFeature, (state) => state.paymentMethods);
export const GetPaymentMethods = createSelector(GetFeature, (state) => state.paymentMethodsList);
export const GetSelectedPaymentMethod = createSelector(GetFeature, (state) => state.selectedPaymentMethod);