import { createSelector } from "@ngrx/store";
import { GetInventoryFeature } from "./get-features"

export const getFeature = createSelector(GetInventoryFeature, (state) => state.inventory);
export const getInventoryMovements = createSelector(getFeature, (state) => state.InventoryMovementsList);
export const getSelectedInventoryMovement = createSelector(getFeature, (state) => state.selectedInventoryMovement);