import { Injectable } from "@angular/core";
import { InventoryMovement } from "../../models/inventory-movement";
import { Store } from "@ngrx/store";
import * as InventorySelector from "../selectors/inventory.selectors";
import * as InventoryActions from "../actions/inventory.actions";
import { InventoryState } from "../states-definition/Inventory.state";

@Injectable({
    providedIn: 'root'
    })
export class InventoryFacade {
    private inventoryMovementsLoaded = false;
    constructor(private store: Store<InventoryState>) {
    }

    getInventoryMovements(): void {
        this.store.dispatch(InventoryActions.GetInventoryMovements());
        this.inventoryMovementsLoaded = true;
    }

    inventoryMovements() {
        if (!this.inventoryMovementsLoaded) {
            this.getInventoryMovements();
        }
        return this.store.select(InventorySelector.getInventoryMovements);
    }

    addInventoryMovement(inventoryMovement: InventoryMovement) {
        this.store.dispatch(InventoryActions.CreateInventoryMovement({ inventoryMovement }));
        this.inventoryMovementsLoaded = false; // Reset inventory movements loaded state to ensure fresh data
    }

    updateInventoryMovement(item: any) {
    }

    deleteInventoryMovement(itemId: number) {
    }
}