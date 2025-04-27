import { Product } from "../../models/product";

export interface ProductState {
    producstList: Product[];
    selectedProduct: Product | null;
}

export interface ProductStateFeature {
    products: ProductState;
}