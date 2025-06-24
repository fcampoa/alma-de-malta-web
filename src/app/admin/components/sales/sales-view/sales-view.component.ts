import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ContainerComponent } from '@shared/container/container.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EMPTY, Observable, Subject, tap } from 'rxjs';
import { ProductOverview } from '@models/product';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { PurchaseOrderNumberPrefix, Sale, SaleDashboard, SaleDashboardOverview } from '../../../../models/sale';
import { SaleFacade } from '../../../../State/facades/sale-facade';
import { CommonModule } from '@angular/common';
import { PaymentMethodFacade } from '../../../../State/facades/payment-method-facade';
import { StatusEnum } from '@enums/status.enum';
import { KartComponent } from '../kart/kart.component';

@Component({
  selector: 'app-sales-view',
  imports: [ContainerComponent, MatButtonModule, MatCardModule, MatDialogModule, MatListModule, CommonModule, KartComponent],
  standalone: true,
  templateUrl: './sales-view.component.html',
  styleUrl: './sales-view.component.scss'
})
export class SalesViewComponent implements OnInit {

  @ViewChild('dashboardModal') dashboardModal!: TemplateRef<any>;

  products!: ProductOverview[];
  productRows: any[][] = [];

  dashboard$: Observable<SaleDashboard | null> = EMPTY;
  dashboard!: SaleDashboard | null;
  dashboardsList$: Observable<SaleDashboardOverview[]> = EMPTY;

  sale!: Sale;

  constructor(private saleFacade: SaleFacade, private dialog: MatDialog) { }

  ngOnInit() {
    this.saleFacade.getSaleDashboards();
    this.dashboardsList$ = this.saleFacade.saleDashboards();
    this.dashboard$ = this.saleFacade.getSelectedSaleDashboard().pipe(
      tap(dashboard => this.loadProducts(dashboard)));
    this.newSale();
  }

  loadProducts(dashboard: SaleDashboard | null) {
    if (dashboard && dashboard.products) {
      this.products = dashboard.products;
      this.productRows = [];
      for (let i = 0; i < this.products.length; i += 3) {
        this.productRows.push(this.products.slice(i, i + 3));
      }
    }
  }

  addToCart(product: ProductOverview) {
    if (!this.sale.products) {
      this.sale.products = [];
    }
    const existing = this.sale.products.find(item => item.product?.productId === product.productId);
    if (existing) {
      existing.quantity = (existing.quantity ?? 0) + 1;
    } else {
      this.sale.products.push({ product: product, quantity: 1 });
      this.sale.products = [...this.sale.products];
    }
  }

  openDashboardModal() {
    this.dialog.open(this.dashboardModal);
  }

  selectDashboard(dashboard: SaleDashboardOverview) {
    this.saleFacade.getSaleDashboardById(dashboard.id);
    this.dialog.closeAll();
  }

  openCart() {
    // Lógica para abrir el carrito
    const dialogRef = this.dialog.open(KartComponent, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: false,
      autoFocus: true,
      panelClass: 'kart-dialog-center',
      data: {
        sale: this.sale
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.saleChangeEvent(result);
    }
    );
  }

  afterPay() {
    // Lógica después de pagar
    this.saleFacade.createSale(this.sale);
    this.newSale();
  }

  saleChangeEvent(result: any) {
    if (result) {
      this.afterPay();
    }
  }

  newSale() {
    this.sale = {
      products: [],
      total: 0,
      status: StatusEnum.Draft
    };
  }
}
