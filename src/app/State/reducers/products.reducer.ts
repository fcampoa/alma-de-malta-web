import { ProductState } from "../states-definition/product.state";
import * as ProductActions from "../actions/products.actions";
import { createReducer, on } from "@ngrx/store";

export const initialState: ProductState = {
    producstList: [],
    selectedProduct: null,
    };

    export const ProductsReducer = createReducer<ProductState>(
        initialState,
        on(ProductActions.SetProducts, (state, {products}) => ({
            ...state,
            producstList: products,
        })),
        on(ProductActions.SetSelectedProduct, (state, {product}) => ({
            ...state,
            selectedProduct: product,
        })),
    );