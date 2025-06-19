import { Injectable } from "@angular/core";
import { SaleState } from "../states-definition/sale.state";
import { Store } from "@ngrx/store";
import * as SaleSelectors from "../selectors/sales.selector";
import * as SaleActions from "../actions/sales.actions";

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
}