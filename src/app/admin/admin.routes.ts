import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'products', loadChildren: () => import('./components/products/products.routes').then(m => m.routes) },
];