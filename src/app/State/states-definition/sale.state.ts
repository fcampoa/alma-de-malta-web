import { Sale } from "../../models/sale";

export interface SaleState {
  salesList: Sale[];
    selectedSale: Sale | null;
}

export interface SaleStateFeature {
  sales: SaleState;
}