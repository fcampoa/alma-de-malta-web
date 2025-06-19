import { Routes } from "@angular/router";
import { ProductComponent } from "./product-management/product.component";
import { ProductListComponent } from "./product-list/product-list.component";

export const routes: Routes = [
    { path: '', component: ProductComponent },
    { path: ':id/edit', component: ProductComponent },
    { path: 'list', component: ProductListComponent },
];