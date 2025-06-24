import { createReducer, on } from "@ngrx/store";
import { SaleState } from "../states-definition/sale.state";
import * as SaleActions from "../actions/sales.actions";

export const InitialState: SaleState = {
    salesList: [],
    selectedSale: null,
    saleDashboards: [],
    selectedSaleDashboard: null,
    purchaseOrderNumberPrefixes: [],
    selectedPurchaseOrderNumberPrefix: null,
};

export const SaleReducer = createReducer<SaleState>(
    InitialState,
    on(SaleActions.SetSales, (state, { sales }) => ({
        ...state,
        salesList: sales,
    })),

    on(SaleActions.SetSelectedSale, (state, { sale }) => ({
        ...state,
        selectedSale: sale,
    })),
    // Sale Dashboard Actions
    on(SaleActions.SetSaleDashboards, (state, { dashboards }) => ({
        ...state,
        saleDashboards: dashboards,
    })),
    on(SaleActions.SetSelectedSaleDashboard, (state, { dashboard }) => ({
        ...state,
        selectedSaleDashboard: dashboard,
    })),
    // Purchase Order Number Prefix Actions
    on(SaleActions.SetPurchaseOrderNumberPrefixes, (state, { prefixes }) => ({
        ...state,
        purchaseOrderNumberPrefixes: prefixes,
    })),
    on(SaleActions.SetPurchaseOrderNumberPrefix, (state, { prefix }) => ({
        ...state,
        selectedPurchaseOrderNumberPrefix: prefix,
    }))
);