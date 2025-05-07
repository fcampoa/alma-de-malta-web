import { Routes } from '@angular/router';
import { MainComponent } from './admin/components/main/main.component';

export const routes: Routes = [
    { path: '', redirectTo: 'site', pathMatch: 'full' },
    { path: 'site', loadChildren: () => import('./site/site.routes').then(m => m.routes) },
    { path: 'admin', component: MainComponent, loadChildren: () => import('./admin/admin.routes').then(m => m.routes) },
];
