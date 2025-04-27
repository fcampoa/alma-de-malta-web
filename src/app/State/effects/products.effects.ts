import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../../services/products.service";
import * as ProductActions from "../actions/products.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { Product } from "../../models/product";
import { Response } from "../../models/response";
import e from "express";

@Injectable()
export class ProductsEffects {
    getProductsEffect$;
    constructor(private productService: ProductService, private actions$: Actions) {

        this.getProductsEffect$ = createEffect(() => {
            console.log('ProductsEffects initialized', this.actions$);
            return this.actions$.pipe(
                ofType(ProductActions.GetProducts),
                switchMap(() =>
                    this.productService.get().pipe(
                        map((response: Response) => {
                            console.log('ProductsEffects initialized', response.body);
                            debugger;
                            return ProductActions.SetProducts({ products: response.body as Product[] });
                        }
                        ),
                        catchError((error) =>
                            of()
                        )
                    )
                )
            );
        });
    }
}