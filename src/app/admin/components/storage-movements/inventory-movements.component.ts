import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { ProductOverview } from '../../../models/product';
import { InventoryFacade } from '../../../State/facades/inventory-facade';
import { ProductFacade } from '../../../State/facades/product-facade';

@Component({
  selector: 'app-inventory-movements',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule],
  templateUrl: './inventory-movements.component.html',
  styleUrl: './inventory-movements.component.scss'
})
export class InventoryMovementsComponent implements OnInit {
  movementForm!: FormGroup;
  products$!: Observable<ProductOverview[]>;

  constructor(    private fb: FormBuilder,
    private inventoryFacade: InventoryFacade,
    private productsFacade: ProductFacade) {
      
    }

      ngOnInit(): void {
    this.movementForm = this.fb.group({
      productId: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      reason: [''],
      date: [new Date(), Validators.required],
      isIncoming: [true, Validators.required]
    });

    this.productsFacade.getProducts();
    this.products$ = this.productsFacade.Products();
  }

    onSubmit(): void {
    if (this.movementForm.valid) {
      const formValue = this.movementForm.value;
      this.inventoryFacade.addInventoryMovement({
        product: { id: formValue.productId } as ProductOverview,
        quantity: formValue.quantity,
        reason: formValue.reason,
        date: formValue.date,
        isIncoming: formValue.isIncoming
      });
      this.movementForm.reset({
        productId: '',
        quantity: 0,
        reason: '',
        date: new Date(),
        isIncoming: true
      });
    }
  }
}
