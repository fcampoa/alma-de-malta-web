import { createAction, props } from "@ngrx/store";
import { salesFeatureKey } from "../features-keys";
import e from "express";
import { Sale } from "../../models/sale";

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