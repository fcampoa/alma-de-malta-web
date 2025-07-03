import { createFeatureSelector } from "@ngrx/store";
import * as FeatureKeys from "../features-keys";
import { ProductStateFeature } from "../states-definition/product.state";
import { InventoryStateFeature } from "../states-definition/Inventory.state";
import { PaymentMethodStateFeature } from "../states-definition/payment-method.state";
import { SaleStateFeature } from "../states-definition/sale.state";
import { AuthStateFeature } from "../states-definition/auth.state";
import { UserStateFeature } from "../states-definition/user.state";

export const GetProductsFeature = createFeatureSelector<ProductStateFeature>(FeatureKeys.productsFeatureKey);
export const GetInventoryFeature = createFeatureSelector<InventoryStateFeature>(FeatureKeys.inventoryFeatureKey);
export const GetPaymentMethodFeature = createFeatureSelector<PaymentMethodStateFeature>(FeatureKeys.paymentMethodsFeatureKey);
export const GetSaleFeature = createFeatureSelector<SaleStateFeature>(FeatureKeys.salesFeatureKey);
export const GetAuthFeature = createFeatureSelector<AuthStateFeature>(FeatureKeys.authFeatureKey);
export const GetUserFeature = createFeatureSelector<UserStateFeature>(FeatureKeys.userFeatureKey);