import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { InventoryMovementsComponent } from "./components/inventory-movements/inventory-movements.component";

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'inventory', component: InventoryMovementsComponent},
    { path: 'products', loadChildren: () => import('./components/products/products.routes').then(m => m.routes) },
    { path: 'sales', loadChildren: () => import('./components/sales/sales.routing').then(m => m.routes) },
    { path: 'payment-methods', loadChildren: () => import('./components/payment-methods/payment-methods.routing').then(m => m.routes) },
    { path: 'users', loadChildren: () => import('./components/users/users.routing').then(m => m.routes) },
];