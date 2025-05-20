import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { InventoryService } from "../../services/inventory.service";
import { Router } from "@angular/router";
import * as InventoryActions from "../actions/inventory.actions";
import { switchMap, map, catchError, of } from "rxjs";
import { InventoryMovement } from "../../models/inventory-movement";
import { ApiResponse } from "../../models/response";


@Injectable({
    providedIn: 'root'
})
export class InventoryEffects {
    getInventoryEffect$;
    getInventoryByIdEffect$;
    createInventoryEffect$;
    constructor(private actions$: Actions, private inventoryService: InventoryService, private router: Router) {
        // This is where you would inject your store and effects to manage state
        this.getInventoryEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(InventoryActions.GetInventoryMovements),
                switchMap(() =>
                    this.inventoryService.get().pipe(
                        map((response: ApiResponse) => {
                            return InventoryActions.SetInventoryMovements({ inventoryMovements: response.body as InventoryMovement[] });
                        }),
                        catchError((error) =>
                            of(InventoryActions.SetInventoryMovements({ inventoryMovements: [] }))
                        )
                    )
                )
            );
        }
        );
        this.getInventoryByIdEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(InventoryActions.GetInventoryMovementById),
                switchMap((action) =>
                    this.inventoryService.getById(action.id).pipe(
                        map((response: ApiResponse) => {
                            return InventoryActions.SetSelectedInventoryMovement({ inventoryMovement: response.body as InventoryMovement });
                        }
                        ),
                        catchError((error) =>
                            of(InventoryActions.SetSelectedInventoryMovement({ inventoryMovement: null }))
                        )
                    )
                )
            );
        }
        );
        this.createInventoryEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(InventoryActions.CreateInventoryMovement),
                switchMap((action) =>
                    this.inventoryService.create(action.inventoryMovement).pipe(
                        map((response: ApiResponse) => {
                            this.router.navigate(['/admin/inventory/list']);
                            return InventoryActions.SetSelectedInventoryMovement({ inventoryMovement: { id: response.body, ...action.inventoryMovement } });
                        }
                        ),
                        catchError((error) =>
                            of(InventoryActions.SetSelectedInventoryMovement({ inventoryMovement: null }))
                        )
                    )
                )
            );
        }
        );
    }
}