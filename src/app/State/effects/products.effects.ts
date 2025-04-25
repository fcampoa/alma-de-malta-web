import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../../services/products.service";
import * as ProductActions from "../actions/products.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { Product } from "../../models/product";

@Injectable()
export class ProductsEffects {
    constructor(private actions$: Actions, private productService: ProductService) {
        console.log('ProductsEffects initialized', this.actions$);
    }
    getProductsEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.GetProducts),
        switchMap(() => this.productService.get().pipe(
            map((products: Product[]) => ProductActions.SetProducts({ products })),
            catchError((error) => of())
        ))
    )); // Replace with your action type
}