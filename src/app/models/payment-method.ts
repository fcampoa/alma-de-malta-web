import { BaseEntity } from './base-entity';
import { PaymentType } from '../enums/payment-type.enum';

export interface PaymentMethod extends BaseEntity {
  itemType: string[]; // Asigna ['PaymentMethod'] al crear la instancia
  name: string;
  type: PaymentType;
  fee: number;
}

export function calculateFee(method: PaymentMethod, amount: number): number {
  return (method.fee / 100) * amount;
}