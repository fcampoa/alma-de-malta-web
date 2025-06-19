import { Injectable } from "@angular/core";
import { ProductState } from "../states-definition/product.state";
import { Store } from "@ngrx/store";
import * as ProductsSelector from "../selectors/products.selectors";
import * as ProductActions from "../actions/products.actions";
import { Product, ProductSearchRequest } from "../../models/product";

@Injectable({
    providedIn: 'root'
})
export class ProductFacade {
    constructor(private store: Store<ProductState>) {
        // This is where you would inject your store and selectors to manage state
    }

    // Example method to get products from the store
    Products() {
        return this.store.select(ProductsSelector.GetProducts);
    }

    getProducts(): void {
        this.store.dispatch(ProductActions.GetProducts());
    }

    // Example method to add a product to the store
    addProduct(product: any) {
        // Logic to dispatch an action to add a product
        this.store.dispatch(ProductActions.CreateProduct({ product }));
    }

    getProductById(id: string) {
        this.store.dispatch(ProductActions.GetProductById({ id }));
    }

    getSelectedProduct() {
        return this.store.select(ProductsSelector.GetSelectedProduct);
    }

    setSelectedProduct(product: Product | null) {
        this.store.dispatch(ProductActions.SetSelectedProduct({ product }));
    }

    updateProduct(product: Product) {
        this.store.dispatch(ProductActions.UpdateProduct({ product }));
    }

    searchProducts(searchRequest: ProductSearchRequest) {
        this.store.dispatch(ProductActions.SearchProducts({ searchRequest }));
    }
}