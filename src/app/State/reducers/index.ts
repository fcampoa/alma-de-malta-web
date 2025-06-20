import { combineReducers } from "@ngrx/store";
import { ProductStateFeature } from "../states-definition/product.state";
import * as ProductReducer from "./products.reducer";
import * as InventoryReducer from "./inventory-movements.reducer";
import * as PaymentReducer from "./payment-method.reducer";
import * as SaleReducer from "./sale.reducer";
import { InventoryStateFeature } from "../states-definition/Inventory.state";
import { PaymentMethodStateFeature } from "../states-definition/payment-method.state";
import { SaleState, SaleStateFeature } from "../states-definition/sale.state";


export const ProductsFeatureReducer = combineReducers<ProductStateFeature>({
    products: ProductReducer.ProductsReducer
});

export const InventoryFeatureReducer = combineReducers<InventoryStateFeature>({
    // Add your inventory reducers here
    inventory: InventoryReducer.InventoryReducer
});

export const PaymentMethodsFeatureReducer = combineReducers<PaymentMethodStateFeature>({
    paymentMethods: PaymentReducer.PaymentMethodsReducer
});


export const SalesFeatureReducer = combineReducers<SaleStateFeature>({
    sales: SaleReducer.SaleReducer
});

export const Reducers = {
    products: ProductsFeatureReducer,
    inventory: InventoryFeatureReducer,
    paymentMethods: PaymentMethodsFeatureReducer,
    sales: SalesFeatureReducer
};