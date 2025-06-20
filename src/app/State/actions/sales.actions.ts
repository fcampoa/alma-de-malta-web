import { createAction, props } from "@ngrx/store";
import { salesFeatureKey } from "../features-keys";
import e from "express";
import { Sale, SaleDashboard } from "../../models/sale";

const prefix = `${salesFeatureKey} [products]`;

export const GetSales = createAction(
    `${prefix} Get Sales`
);

export const GetSaleById = createAction(
    `${prefix} Get Sale By Id`,
    props<{ id: any }>()
);

export const SetSales = createAction(
    `${prefix} Set Sales`,
    props<{ sales: Sale[] }>()
);

export const SetSelectedSale = createAction(
    `${prefix} Set Selected Sale`,
    props<{ sale: Sale | null }>()
);

export const CreateSale = createAction(
    `${prefix} Create Sale`,
    props<{ sale: Sale }>()
);

export const UpdateSale = createAction(
    `${prefix} Update Sale`,
    props<{ sale: Sale }>()
);

export const DeleteSale = createAction(
    `${prefix} Delete Sale`,
    props<{ id: any }>()
);

export const SearchSales = createAction(
    `${prefix} Search Sales`,
    props<{ searchRequest: any }>()
);

// Sale Dashboard Actions

export const CreateSaleDashboard = createAction(
    `${prefix} Create Sale Dashboard`,
    props<{ dashboard: SaleDashboard }>()
);

export const UpdateSaleDashboard = createAction(
    `${prefix} Update Sale Dashboard`,
    props<{ dashboard: SaleDashboard }>()
);

export const GetSaleDashboards = createAction(
    `${prefix} Get Sale Dashboards`
);

export const SetSaleDashboards = createAction(
    `${prefix} Set Sale Dashboards`,
    props<{ dashboards: SaleDashboard[] }>()
);

export const GetSaleDashboardById = createAction(
    `${prefix} Get Sale Dashboard By Id`,
    props<{ id: any }>()
);

export const SetSelectedSaleDashboard = createAction(
    `${prefix} Set Selected Sale Dashboard`,
    props<{ dashboard: SaleDashboard | null }>()
);

export const SetSalesFilter = createAction(
    `${prefix} Set Sales Filter`,
    props<{ filter: any }>()
);

export const DeleteSaleDashboard = createAction(
    `${prefix} Delete Sale Dashboard`,
    props<{ id: any }>()
);