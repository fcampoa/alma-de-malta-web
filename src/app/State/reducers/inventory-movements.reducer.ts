import { InventoryState } from "../states-definition/Inventory.state";
import { createReducer, on } from "@ngrx/store";
import * as InventoryActions from "../actions/inventory.actions";

export const initialState: InventoryState = {
    InventoryMovementsList: [],
    selectedInventoryMovement: null,
}

export const InventoryReducer = createReducer<InventoryState>(
    initialState,
    on(InventoryActions.SetInventoryMovements, (state, { inventoryMovements }) => ({
            ...state,
            storageList: inventoryMovements,
        })
    ),
    on(InventoryActions.SetSelectedInventoryMovement, (state, { inventoryMovement }) => ({
            ...state,
            selectedInventoryMovement: inventoryMovement,
        })
    ),
);