import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from '../../../../models/payment-method';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ContainerComponent } from '../../../../shared/container/container.component';
import { ListContainerComponent } from "../../../../shared/list-container/list-container.component";
import { PaymentMethodFacade } from '../../../../State/facades/payment-method-facade';
import { EMPTY, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PaymentType, PaymentTypeLabels } from '../../../../enums/payment-type.enum';

@Component({
  selector: 'app-payment-method-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, ListContainerComponent, CommonModule],
  templateUrl: './payment-method-list.component.html',
  styleUrl: './payment-method-list.component.scss'
})
export class PaymentMethodListComponent implements OnInit {
 paymentMethods$: Observable<PaymentMethod[]> = EMPTY;
 displayedColumnsKeys = ['Nombre', 'Tipo', 'Comision'];
 paymentTypeLabels =  PaymentTypeLabels;

 constructor(private paymentMethodFacade: PaymentMethodFacade) { }


  ngOnInit() {
    this.paymentMethods$ = this.paymentMethodFacade.paymentMethods();
    this.paymentMethodFacade.getPaymentMethods();
  }

  getPaymentTypeLabel(type: PaymentType): string {
    const found = this.paymentTypeLabels.find(label => label.value === type);
    return found ? found.label : '';
  }
}
