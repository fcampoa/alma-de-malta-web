import { createAction, props } from "@ngrx/store";
import { productsFeatureKey } from "../features-keys";
import { Product, ProductOverview, ProductSearchRequest } from "../../models/product";

const prefix = `${productsFeatureKey} [products]`;

export const GetProducts = createAction(
  `${prefix} Get Products`
);
export const GetProductById = createAction(
  `${prefix} Get Products By Id`,
  props<{ id: string }>()
  );

export const SetProducts = createAction(
  `${prefix} Set Products`,
  props< { products: ProductOverview[] }>()
);

export const SetSelectedProduct = createAction(
  `${prefix} Set Selected Product`,
  props<{ product: Product | null }>()
);

export const CreateProduct = createAction(
  `${prefix} Create Product`,
  props<{ product: Product }>()
);

export const UpdateProduct = createAction(
  `${prefix} Update Product`,
  props<{ product: Product }>()
);

export const SearchProducts = createAction(
  `${prefix} Search Products`,
  props<{ searchRequest: ProductSearchRequest }>()
);