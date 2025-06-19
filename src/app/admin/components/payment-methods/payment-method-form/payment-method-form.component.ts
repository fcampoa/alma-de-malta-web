import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ContainerComponent } from '../../../../shared/container/container.component';
import { PaymentTypeLabels } from '../../../../enums/payment-type.enum';
import { MatSelect } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { PaymentMethodFacade } from '../../../../State/facades/payment-method-facade';
import { PaymentMethod } from '../../../../models/payment-method';

@Component({
  selector: 'app-payment-method-form',
  standalone: true,
  imports: [MatButtonModule,
            CommonModule,
            MatOptionModule, 
            ReactiveFormsModule, 
            MatInputModule, 
            MatFormFieldModule,
            ContainerComponent,
            MatSelect,
            ReactiveFormsModule,
            MatIconModule],
  templateUrl: './payment-method-form.component.html',
  styleUrl: './payment-method-form.component.scss'
})
export class PaymentMethodFormComponent {
  paymentMethodForm: FormGroup;
  paymentTypes = PaymentTypeLabels;

  constructor(private fb: FormBuilder, private paymentMethodFacade: PaymentMethodFacade) { // Replace 'any' with the actual facade type
    this.paymentMethodForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      fee: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.paymentMethodForm.valid) {
      const paymentMethodData = this.paymentMethodForm.value as PaymentMethod;
      this.paymentMethodFacade.addPaymentMethod(paymentMethodData);
      console.log(this.paymentMethodForm.value);
    }
  }
}
