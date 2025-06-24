import { StatusEnum } from '../enums/status.enum';
import { BaseEntity } from './base-entity';
import { PaymentMethod } from './payment-method';
import { ProductOverview } from './product';

export interface Sale extends BaseEntity {
  products?: SaleDetail[];
  subtotal?: number;
  total?: number;
  paymentMethod?: PaymentMethod;
  status?: StatusEnum;
  purchaseOrderNumberPrefixId?: string;
  purchaseOrderNumber?: string;
}

export interface SaleDashboard extends BaseEntity {
  products?: ProductOverview[];
  name?: string;
  isDefault?: boolean;
}

export interface SaleDashboardOverview {
  id?: any;
  name?: string;
  isDefault?: boolean;
  totalProducts?: number;
}

export interface SaleDetail {
  product?: ProductOverview;
  quantity?: number;
}

export interface PurchaseOrderNumberPrefix extends BaseEntity {
  prefix?: string;
  number?: number;
  description?: string;
}