import { Routes } from "@angular/router";
import { SalesViewComponent } from "./sales-view/sales-view.component";
import { SalesDashboardComponent } from "./sales-dashboard/sales-dashboard.component";
import { SaleDashboardFormComponent } from "./sales-dashboard/sales-dashboard-form/sales-dashboard-form.component";
import { SalePrefixesComponent } from "./sale-prefixes/sale-prefixes.component";
import { PrefixesFormComponent } from "./sale-prefixes/prefixes-form/prefixes-form.component";
import { SalesListComponent } from "./sales-list/sales-list.component";

export const routes: Routes = [
    { path: '', component: SalesListComponent },
    { path: 'create', component: SalesViewComponent },
    { path: ':id/edit', component: SalesViewComponent },
    { path: 'dashboard', component: SalesDashboardComponent },
    { path: 'dashboard/create', component: SaleDashboardFormComponent },
    { path: 'dashboard/:id/edit', component: SaleDashboardFormComponent },
    { path: 'prefixes', component: SalePrefixesComponent },
    { path: 'prefixes/create', component: PrefixesFormComponent },
    { path: 'prefixes/:id/edit', component: PrefixesFormComponent }

];