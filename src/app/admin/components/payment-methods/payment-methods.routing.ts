import { Routes } from '@angular/router';
import { PaymentMethodListComponent } from './payment-method-list/payment-method-list.component';
import { PaymentMethodFormComponent } from './payment-method-form/payment-method-form.component';

export const routes: Routes = [
  { path: '', component: PaymentMethodListComponent },
  { path: 'add', component: PaymentMethodFormComponent },
  { path: ':id/edit', component: PaymentMethodFormComponent }
];