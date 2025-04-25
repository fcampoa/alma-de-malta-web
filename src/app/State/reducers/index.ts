import { combineReducers } from "@ngrx/store";
import { ProductState, ProductStateFeature } from "../states-definition/product.state";
import * as ProductReducer from "./products.reducer";


export const ProductsFeatureReducer = combineReducers<ProductStateFeature>({
    products: ProductReducer.ProductsReducer
});

export const Reducers = {
    products: ProductsFeatureReducer
};