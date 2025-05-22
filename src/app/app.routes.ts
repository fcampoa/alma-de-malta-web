import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'site', pathMatch: 'full' },
    { path: 'site', loadChildren: () => import('./site/site.routes').then(m => m.routes) },
    { path: 'admin', loadChildren: () => import('./admin/admin.routes').then(m => m.routes) },
];
