import { createSelector } from "@ngrx/store";
import { GetAuthFeature } from "./get-features";

const GetFeature = createSelector(GetAuthFeature, (state) => state.auth);
export const GetAuthUser = createSelector(GetFeature, (state) => state.user);
export const GetIsAuthenticated = createSelector(GetFeature, (state) => state.isAuthenticated);
export const GetAccessToken = createSelector(GetFeature, (state) => state.accessToken);