import { createFeatureSelector } from "@ngrx/store";
import { inventoryFeatureKey, paymentMethodsFeatureKey, productsFeatureKey, salesFeatureKey } from "../features-keys";
import { ProductStateFeature } from "../states-definition/product.state";
import { InventoryStateFeature } from "../states-definition/Inventory.state";
import { PaymentMethodStateFeature } from "../states-definition/payment-method.state";
import { SaleStateFeature } from "../states-definition/sale.state";

export const GetProductsFeature = createFeatureSelector<ProductStateFeature>(productsFeatureKey);
export const GetInventoryFeature = createFeatureSelector<InventoryStateFeature>(inventoryFeatureKey);
export const GetPaymentMethodFeature = createFeatureSelector<PaymentMethodStateFeature>(paymentMethodsFeatureKey);
export const GetSaleFeature = createFeatureSelector<SaleStateFeature>(salesFeatureKey);