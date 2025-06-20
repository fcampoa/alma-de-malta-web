import { Injectable } from "@angular/core";
import { SaleState } from "../states-definition/sale.state";
import { Store } from "@ngrx/store";
import * as SaleSelectors from "../selectors/sales.selector";
import * as SaleActions from "../actions/sales.actions";
import { SaleDashboard } from "../../models/sale";

@Injectable({
    providedIn: 'root'
})
export class SaleFacade {
    
    constructor(private store: Store<SaleState>) {
    }

    getSales(): void {
        this.store.dispatch(SaleActions.GetSales());
    }

    sales() {
        return this.store.select(SaleSelectors.GetSales);
    }

    getSaleById(id: string) {
        this.store.dispatch(SaleActions.GetSaleById({ id }));
    }

    getSelectedSale() {
        return this.store.select(SaleSelectors.GetSelectedSale);
    }

    setSelectedSale(sale: any | null) {
        this.store.dispatch(SaleActions.SetSelectedSale({ sale }));
    }

    createSale(sale: any) {
        this.store.dispatch(SaleActions.CreateSale({ sale }));
    }

    updateSale(sale: any) {
        this.store.dispatch(SaleActions.UpdateSale({ sale }));
    }

    deleteSale(id: any) {
        this.store.dispatch(SaleActions.DeleteSale({ id }));
    }

    searchSales(searchRequest: any) {
        this.store.dispatch(SaleActions.SearchSales({ searchRequest }));
    }

    // Sale Dashboard Actions

    getSaleDashboards() {
        this.store.dispatch(SaleActions.GetSaleDashboards());
    }

    saleDashboards() {
        return this.store.select(SaleSelectors.GetSaleDashboards);
    }

    getSaleDashboardById(id: string) {
        this.store.dispatch(SaleActions.GetSaleDashboardById({ id }));
    }

    getSelectedSaleDashboard() {
        return this.store.select(SaleSelectors.GetSelectedSaleDashboard);
    }

    createSaleDashboard(dashboard: SaleDashboard) {
        this.store.dispatch(SaleActions.CreateSaleDashboard({ dashboard }));
    }

    updateSaleDashboard(dashboard: SaleDashboard) {
        this.store.dispatch(SaleActions.UpdateSaleDashboard({ dashboard }));
    }
}