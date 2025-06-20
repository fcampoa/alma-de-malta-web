import { StatusEnum } from '../enums/status.enum';
import { BaseEntity } from './base-entity';
import { PaymentMethod } from './payment-method';
import { ProductOverview } from './product';

export interface Sale extends BaseEntity {
  products: ProductOverview[];
  subtotal: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: StatusEnum;
}

export interface SaleDashboard extends BaseEntity {
  products?: ProductOverview[];
  name?: string;
}

export interface SaleDashboardOverview {
  id?: any;
  name?: string;
}