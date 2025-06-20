import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../../services/products.service";
import * as ProductActions from "../actions/products.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { Product, ProductOverview } from "../../models/product";
import { ApiResponse } from "../../models/response";
import { Router } from "@angular/router";

@Injectable()
export class ProductsEffects {
    getProductsEffect$;
    getProductsByIdEffect$;
    createProductEffect$;
    searchProductsEffect$;
    constructor(private productService: ProductService, private actions$: Actions, private route: Router) {

        this.getProductsEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(ProductActions.GetProducts),
                switchMap(() =>
                    this.productService.get().pipe(
                        map((response: ApiResponse) => {
                            return ProductActions.SetProducts({ products: response.body as ProductOverview[] });
                        }
                        ),
                        catchError((error) =>
                            of(ProductActions.SetProducts({ products: [] }))
                        )
                    )
                )
            );
        });
        this.getProductsByIdEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(ProductActions.GetProductById),
                switchMap((action) =>
                    this.productService.getById(action.id).pipe(
                        map((response: ApiResponse) => {
                            return ProductActions.SetSelectedProduct({ product: response.body as Product });
                        }
                        ),
                        catchError((error) => 
                            of(ProductActions.SetSelectedProduct({ product: null }))
                        )
                    )
                )
            );
        });
        this.createProductEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(ProductActions.CreateProduct),
                switchMap((action) =>
                    this.productService.create(action.product).pipe(
                        map((response: ApiResponse) => {
                            this.route.navigate(['/admin/products/list']);
                            return ProductActions.SetSelectedProduct({ product: { id: response.body, ...action.product } });
                        }
                        ),
                        catchError((error) => 
                            of(ProductActions.SetSelectedProduct({ product: null }))
                        )
                    )
                )
            );
        });
        this.searchProductsEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(ProductActions.SearchProducts),
                switchMap((action) =>
                    this.productService.search(action.searchRequest).pipe(
                        map((response: ApiResponse) => {
                            return ProductActions.SetProducts({ products: response.body as ProductOverview[] });
                        }
                        ),
                        catchError((error) =>
                            of(ProductActions.SetProducts({ products: [] }))
                        )
                    )
                )
            );
        });
    }    
}