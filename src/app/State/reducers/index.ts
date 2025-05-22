import { combineReducers } from "@ngrx/store";
import { ProductStateFeature } from "../states-definition/product.state";
import * as ProductReducer from "./products.reducer";
import * as InventoryReducer from "./inventory-movements.reducer";
import { InventoryStateFeature } from "../states-definition/Inventory.state";


export const ProductsFeatureReducer = combineReducers<ProductStateFeature>({
    products: ProductReducer.ProductsReducer
});

export const InventoryFeatureReducer = combineReducers<InventoryStateFeature>({
    // Add your inventory reducers here
    inventory: InventoryReducer.InventoryReducer
});

export const Reducers = {
    products: ProductsFeatureReducer,
    inventory: InventoryFeatureReducer
};