import { Component, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductOverview } from '../../../../../models/product';
import { SaleDashboard } from '../../../../../models/sale';
import { ContainerComponent } from '../../../../../shared/container/container.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProductFacade } from '../../../../../State/facades/product-facade';
import { SaleFacade } from '../../../../../State/facades/sale-facade';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sales-dashboard-form',
  imports: [ContainerComponent,
    MatFormFieldModule,
    CommonModule,
    MatListModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule],
  standalone: true,
  templateUrl: './sales-dashboard-form.component.html',
  styleUrl: './sales-dashboard-form.component.scss'
})
export class SaleDashboardFormComponent implements OnChanges, OnInit {

  products: ProductOverview[] = [];
  dashboard?: SaleDashboard;

  products$: Observable<ProductOverview[]> = EMPTY;

  dashboardForm: FormGroup;

  constructor(private fb: FormBuilder, private productsFacade: ProductFacade, private saleFacade: SaleFacade, private router: ActivatedRoute) {

    this.dashboardForm = this.fb.group({
      name: ['', Validators.required],
      isDefault: [false],
      products: [[] as ProductOverview[]]
    });

  }

  ngOnInit(): void {
    this.products$ = this.productsFacade.Products();
    let id;
    if ((id = this.router.snapshot.params['id'])) {
      this.loadDashboard(id);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dashboard'] && this.dashboard) {
      this.dashboardForm.patchValue({
        name: this.dashboard.name,
        products: this.dashboard.products || []
      });
    }
  }

  patchProducts(products: ProductOverview[]) {

  }

  isProductSelected(product: ProductOverview): boolean {
    const selected: ProductOverview[] = this.dashboardForm.get('products')?.value || [];
    return selected.some(p => p.productId === product.productId);
  }

  onProductToggle(product: ProductOverview, checked: boolean) {
    let selected: ProductOverview[] = this.dashboardForm.get('products')?.value || [];
    if (checked) {
      selected = [...selected, product];
    } else {
      selected = selected.filter(p => p.productId !== product.productId);
    }
    this.dashboardForm.patchValue({ products: selected });
  }

  onSubmit() {
    if (this.dashboardForm.valid) {
      this.dashboard = {id: this.dashboard?.id, ...this.dashboardForm.value as SaleDashboard};
      if (this.dashboard.id) {
        this.saleFacade.updateSaleDashboard(this.dashboard);
      }
      else {
        this.saleFacade.createSaleDashboard(this.dashboard);
      }
      this.dashboardForm.reset();
    }
  }

  loadDashboard(dashboardId: any) {
    this.dashboard = undefined;
    this.saleFacade.getSaleDashboardById(dashboardId);
    this.saleFacade.getSelectedSaleDashboard().subscribe(dashboard => {
      if (dashboard) {
        this.dashboard = dashboard;
        this.dashboardForm.patchValue({
          name: dashboard.name,
          products: dashboard.products || [],
          isDefault: dashboard.isDefault || false
        });
      }
    });
  }
}
