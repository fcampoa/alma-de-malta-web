import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'site', pathMatch: 'full' },
    { path: 'site', loadChildren: () => import('./site/site.routes').then(m => m.routes) },
    { path: 'admin', canActivate: [AuthGuard], loadChildren: () => import('./admin/admin.routes').then(m => m.routes) },
];
