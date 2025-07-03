import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GetUserFeature } from "./get-features";

const GetFeature = createSelector(GetUserFeature, (state) => state.users);
export const GetUsers = createSelector(GetFeature, (state) => state.usersList);
export const GetSelectedUser = createSelector(GetFeature, (state) => state.selectedUser);