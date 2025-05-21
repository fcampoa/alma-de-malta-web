import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { InventoryMovementsComponent } from "./components/storage-movements/inventory-movements.component";

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'inventory', component: InventoryMovementsComponent},
    { path: 'products', loadChildren: () => import('./components/products/products.routes').then(m => m.routes) },
];