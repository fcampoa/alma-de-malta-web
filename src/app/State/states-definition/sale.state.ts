import { Sale, SaleDashboard } from "../../models/sale";

export interface SaleState {
    salesList: Sale[];
    selectedSale: Sale | null;
    saleDashboards: SaleDashboard[];
    selectedSaleDashboard: SaleDashboard | null;
}

export interface SaleStateFeature {
    sales: SaleState;
}