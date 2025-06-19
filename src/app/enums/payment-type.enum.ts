export enum PaymentType {
    Cash = 0,
    Card = 1,
    Transfer = 2,
    Other = 3
}

export const PaymentTypeLabels: { value: PaymentType, label: string }[] = [
    { value: PaymentType.Cash, label: 'Efectivo' },
    { value: PaymentType.Card, label: 'Tarjeta' },
    { value: PaymentType.Transfer, label: 'Transferencia' },
    { value: PaymentType.Other, label: 'Otro' }
];