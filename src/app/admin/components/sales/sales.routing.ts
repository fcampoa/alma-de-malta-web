import { Routes } from "@angular/router";
import { SalesViewComponent } from "./sales-view/sales-view.component";
import { SalesDashboardComponent } from "./sales-dashboard/sales-dashboard.component";
import { SaleDashboardFormComponent } from "./sales-dashboard/sales-dashboard-form/sales-dashboard-form.component";

export const routes: Routes = [
    { path: 'create', component: SalesViewComponent },
    { path: ':id/edit', component: SalesViewComponent },
    { path: 'dashboard', component: SalesDashboardComponent },
    { path: 'dashboard/create', component: SaleDashboardFormComponent },
    { path: 'dashboard/:id/edit', component: SaleDashboardFormComponent }

];