import { createAction, props } from "@ngrx/store";
import { productsFeatureKey } from "../features-keys";
import { Product } from "../../models/product";

const prefix = `${productsFeatureKey} [products]`;

export const GetProducts = createAction(
  `${prefix} Get Products`
);

export const SetProducts = createAction(
  `${prefix} Set Products`,
  props< { products: Product[] }>()
);

export const SetSelectedProduct = createAction(
  `${prefix} Set Selected Product`,
  props<{ product: Product | null }>()
);
