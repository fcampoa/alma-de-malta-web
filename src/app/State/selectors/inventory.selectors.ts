import { createSelector } from "@ngrx/store";
import { GetInventoryFeature } from "./get-features"

const GetFeature = createSelector(GetInventoryFeature, (state) => state.inventory);
export const getInventoryMovements = createSelector(GetFeature, (state) => state.InventoryMovementsList);
export const getSelectedInventoryMovement = createSelector(GetFeature, (state) => state.selectedInventoryMovement);