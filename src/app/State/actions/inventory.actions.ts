import { createAction, props } from "@ngrx/store";
import { inventoryFeatureKey } from "../features-keys";
import { InventoryMovement } from "../../models/inventory-movement";

export const prefix = `${inventoryFeatureKey} [InventoryMovement]`;

export const GetInventoryMovements = createAction(
    `${prefix} Get Inventory Movements`
    );

export const GetInventoryMovementById = createAction(
    `${prefix} Get Inventory Movement By Id`,
    props<{ id: string }>()
    );

export const SetInventoryMovements = createAction(
    `${prefix} Set Inventory Movements`,
    props<{ inventoryMovements: InventoryMovement[] }>()
    );

export const SetSelectedInventoryMovement = createAction(
    `${prefix} Set Selected Inventory Movement`,
    props<{ inventoryMovement: InventoryMovement | null }>()
    );

export const CreateInventoryMovement = createAction(
    `${prefix} Create Inventory Movement`,
    props<{ inventoryMovement: InventoryMovement }>()
    );