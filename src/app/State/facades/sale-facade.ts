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
    
    private salesLoaded = false;
    private saleDashboardsLoaded = false;
    private purchaseOrderNumberPrefixesLoaded = false;

    constructor(private store: Store<SaleState>) {
    }

    getSales(): void {
        
        this.store.dispatch(SaleActions.GetSales());
        this.salesLoaded = true;
    }

    sales() {
        if (!this.salesLoaded) {
            this.getSales();
        }
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
        this.salesLoaded = false; // Reset sales loaded state to ensure fresh data
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
        this.saleDashboardsLoaded = true;
    }

    saleDashboards() {
        if (!this.saleDashboardsLoaded) {
            this.getSaleDashboards();
        }
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
        this.saleDashboardsLoaded = false; // Reset dashboards loaded state to ensure fresh data
    }

    updateSaleDashboard(dashboard: SaleDashboard) {
        this.store.dispatch(SaleActions.UpdateSaleDashboard({ dashboard }));
        this.saleDashboardsLoaded = false; // Reset dashboards loaded state to ensure fresh data
    }

    // Purchase Order Number Prefix Actions

    getPurchaseOrderNumberPrefixes() {
        this.store.dispatch(SaleActions.GetPurchaseOrderNumberPrefixes());
        this.purchaseOrderNumberPrefixesLoaded = true;
    }

    purchaseOrderNumberPrefixes() {
        if (!this.purchaseOrderNumberPrefixesLoaded) {
            this.getPurchaseOrderNumberPrefixes();
        }
        return this.store.select(SaleSelectors.GetPurchaseOrderNumberPrefixes);
    }

    getSelectedPurchaseOrderNumberPrefix() {
        return this.store.select(SaleSelectors.GetSelectedPurchaseOrderNumberPrefix);
    }

    setSelectedPurchaseOrderNumberPrefix(prefix: any | null) {
        this.store.dispatch(SaleActions.SetPurchaseOrderNumberPrefix({ prefix }));
    }
    
    getPurchaseOrderNumberPrefixById(id: string) {
        this.store.dispatch(SaleActions.GetPurchaseOrderNumberPrefixById({ id }));
    }

    createPurchaseOrderNumberPrefix(prefix: any) {
        this.store.dispatch(SaleActions.CreatePurchaseOrderNumberPrefix({ prefix }));
        this.purchaseOrderNumberPrefixesLoaded = false; // Reset prefixes loaded state to ensure fresh data
    }

    updatePurchaseOrderNumberPrefix(prefix: any) {
        this.store.dispatch(SaleActions.UpdatePurchaseOrderNumberPrefix({ prefix }));
        this.purchaseOrderNumberPrefixesLoaded = false; // Reset prefixes loaded state to ensure fresh data
    }
}