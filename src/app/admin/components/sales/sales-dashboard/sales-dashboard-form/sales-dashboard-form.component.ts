import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductOverview } from '../../../../../models/product';
import { SaleDashboard } from '../../../../../models/sale';
import { ContainerComponent } from '../../../../../shared/container/container.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatPseudoCheckboxModule } from '@angular/material/core';

@Component({
  selector: 'app-sales-dashboard-form',
  imports: [ContainerComponent, 
            MatFormFieldModule, 
            CommonModule, 
            MatListModule, 
            MatPseudoCheckboxModule, 
            ReactiveFormsModule],
  standalone: true,
  templateUrl: './sales-dashboard-form.component.html',
  styleUrl: './sales-dashboard-form.component.scss'
})
export class SaleDashboardFormComponent {
  @Input() products: ProductOverview[] = [];
  @Input() dashboards: SaleDashboard[] = [];
  @Output() saveDashboard = new EventEmitter<SaleDashboard>();
  @Output() selectDashboard = new EventEmitter<SaleDashboard>();

  dashboardForm: FormGroup;
  selectedProducts: ProductOverview[] = [];

  constructor(private fb: FormBuilder) {
    this.dashboardForm = this.fb.group({
      name: ['', Validators.required],
      products: [[]]
    });
  }

  onProductToggle(product: ProductOverview, checked: boolean) {
    if (checked) {
      this.selectedProducts.push(product);
    } else {
      this.selectedProducts = this.selectedProducts.filter(p => p.productId !== product.productId);
    }
    this.dashboardForm.patchValue({ products: this.selectedProducts });
  }

  onSubmit() {
    if (this.dashboardForm.valid) {
      this.saveDashboard.emit(this.dashboardForm.value);
      this.dashboardForm.reset();
      this.selectedProducts = [];
    }
  }

  onDashboardSelect(dashboard: SaleDashboard) {
    this.selectDashboard.emit(dashboard);
  }
}
