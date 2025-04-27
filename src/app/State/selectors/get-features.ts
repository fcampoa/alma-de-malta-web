import { createFeatureSelector } from "@ngrx/store";
import { productsFeatureKey } from "../features-keys";
import { ProductStateFeature } from "../states-definition/product.state";

export const GetProductsFeature = createFeatureSelector<ProductStateFeature>(productsFeatureKey);