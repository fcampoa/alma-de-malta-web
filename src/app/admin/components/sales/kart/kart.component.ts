import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentMethod, calculateFee } from '@models/payment-method';
import { PurchaseOrderNumberPrefix, Sale, SaleDetail } from '@models/sale';
import { PaymentType } from '@enums/payment-type.enum';
import { ContainerComponent } from '@shared/container/container.component';
import { PaymentMethodFacade } from '@facades/payment-method-facade';
import { BehaviorSubject, EMPTY, Observable, tap } from 'rxjs';
import { SaleFacade } from '@facades/sale-facade';

@Component({
  selector: 'app-kart',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    CommonModule,
    ContainerComponent
  ],
  templateUrl: './kart.component.html',
  styleUrl: './kart.component.scss'
})
export class KartComponent implements OnInit {
  
  @Input() sale!: Sale;
  @Output() saleChange: EventEmitter<Sale> = new EventEmitter<Sale>();

  productsSubject: BehaviorSubject<SaleDetail[]> = new BehaviorSubject<SaleDetail[]>([]);

  paymentMethods$: Observable<PaymentMethod[]> = EMPTY;
  prefixes$: Observable<PurchaseOrderNumberPrefix[]> = EMPTY;

  selectedPaymentMethod!: PaymentMethod;
  cashReceived: number = 0;
  paymentTypeEnum = PaymentType;

  prefixes: PurchaseOrderNumberPrefix[] = []; // Llena este arreglo con tus prefijos
  selectedPrefix!: PurchaseOrderNumberPrefix;

  constructor(
    private readonly saleFacade: SaleFacade,
    private readonly paymentMethodFacade: PaymentMethodFacade,
    @Optional() public dialogRef?: MatDialogRef<KartComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data?: { sale: Sale }
  ) {
    if (data?.sale) {
      this.sale = data.sale;
    }
  }
  ngOnInit(): void {
    this.prefixes$ = this.saleFacade.purchaseOrderNumberPrefixes().pipe(tap(prefixes => {
      this.selectedPrefix = prefixes[0];
    }));
    this.paymentMethods$ = this.paymentMethodFacade.paymentMethods();
}

  removeOne(item: SaleDetail) {
    if (item.quantity && item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this.removeAll(item);
    }
  }

  removeAll(item: SaleDetail) {
    if (this.sale.products) {
      this.sale.products = this.sale.products.filter(p => p !== item);
    }
  }

  getTotal(): number {
    return this.sale.products
      ? this.sale.products.reduce((sum, item) => sum + (((item.product?.price ?? 0) * (item.quantity ?? 1))), 0)
      : 0;
  }

  getChange(): number {
    return this.cashReceived > 0 ? this.cashReceived - this.getTotal() : 0;
  }

  onPaymentMethodChange() {
    if (this.selectedPaymentMethod && this.selectedPaymentMethod?.type !== PaymentType.Cash) {
      this.cashReceived = 0;
    }
  }

  close(result: boolean = false) {
    if (result) {
      this.sale.paymentMethod = this.selectedPaymentMethod;
      this.sale.subtotal = this.getTotal();
      this.sale.total = this.getTotal() - calculateFee(this.selectedPaymentMethod, this.getTotal());
      if (this.selectedPrefix) {
        this.sale.purchaseOrderNumberPrefixId = this.selectedPrefix.id;
      }
    }
    if (this.dialogRef) {
      this.dialogRef?.close(result);
    }
    else {
      this.saleChange.emit(this.sale);
    }
  }

  calculateChange() {
    return this.getChange();
  }
}
