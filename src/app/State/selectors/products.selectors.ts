import { createSelector } from "@ngrx/store";
import { GetProductsFeature } from "./get-features";

export const GetFeature = createSelector(GetProductsFeature, (state) => state.products);
export const GetProducts = createSelector(GetFeature, (state) => state.producstList);
export const GetSelectedProduct = createSelector(GetFeature, (state) => state.selectedProduct);