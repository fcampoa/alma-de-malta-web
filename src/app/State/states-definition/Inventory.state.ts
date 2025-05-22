import { InventoryMovement } from "../../models/inventory-movement";

export interface InventoryState {
    InventoryMovementsList: InventoryMovement[];
    selectedInventoryMovement: InventoryMovement | null;
}

export interface InventoryStateFeature {
    inventory: InventoryState;
}