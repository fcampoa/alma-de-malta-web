import { createSelector } from "@ngrx/store";
import { GetSaleFeature } from "./get-features";

const GetFeature = createSelector(GetSaleFeature, (state) => state.sales);
export const GetSales = createSelector(GetFeature, (state) => state.salesList);
export const GetSelectedSale = createSelector(GetFeature, (state) => state.selectedSale);
// Sale Dashboard Selectors
export const GetSaleDashboards = createSelector(GetFeature, (state) => state.saleDashboards);
export const GetSelectedSaleDashboard = createSelector(GetFeature, (state) => state.selectedSaleDashboard);
// Purchase Order Number Prefix Selectors
export const GetPurchaseOrderNumberPrefixes = createSelector(GetFeature, (state) => state.purchaseOrderNumberPrefixes);
export const GetSelectedPurchaseOrderNumberPrefix = createSelector(GetFeature, (state) => state.selectedPurchaseOrderNumberPrefix);