import { Injectable } from "@angular/core";
import { InventoryMovement } from "../../models/inventory-movement";
import { Store } from "@ngrx/store";
import * as InventorySelector from "../selectors/inventory.selectors";
import * as InventoryActions from "../actions/inventory.actions";

@Injectable({
    providedIn: 'root'
    })
export class InventoryFacade {
    constructor(private store: Store<InventoryMovement>) {
    }

    getInventoryMovements() {
        return this.store.select(InventorySelector.getInventoryMovements);
    }

    addInventoryMovement(inventoryMovement: InventoryMovement) {
        this.store.dispatch(InventoryActions.CreateInventoryMovement({ inventoryMovement }));
    }

    updateInventoryMovement(item: any) {
    }

    deleteInventoryMovement(itemId: number) {
    }
}