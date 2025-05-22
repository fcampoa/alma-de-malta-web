import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Observable } from 'rxjs';
import { ProductOverview } from '../../../models/product';
import { InventoryFacade } from '../../../State/facades/inventory-facade';
import { ProductFacade } from '../../../State/facades/product-facade';
import { InventoryMovement } from '../../../models/inventory-movement';

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
    providers: [provideNativeDateAdapter()],
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
      product: ['', Validators.required],
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
      const movement = this.movementForm.value as InventoryMovement;
      this.inventoryFacade.addInventoryMovement(movement);
      this.movementForm.reset();
    }
  }
}

