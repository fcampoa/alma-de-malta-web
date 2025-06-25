import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ProductFacade } from '../../../../State/facades/product-facade';
import { EMPTY, Observable, tap } from 'rxjs';
import { Product, ProductOverview } from '@models/product';
import { ProductType } from '@enums/product-type.enum';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ListContainerComponent } from "@shared/list-container/list-container.component";
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, ListContainerComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  isLoading: boolean = false;

  products$: Observable<Product[]> = EMPTY;
  displayedColumns: string[] = ['name', 'description', 'price', 'stock', 'actions'];
  productTypes = ProductType;

  activeType: ProductType = ProductType.all;

  constructor(private productsFacade: ProductFacade, private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.products$ = this.productsFacade.Products().pipe(  tap({
    next: products => {
      this.isLoading = false;
        this.notificationService.success('Productos cargados correctamente');
    },
    error: err => {
      this.isLoading = false;
      this.notificationService.error('Error al cargar los productos: ' + err.message);
    },
    complete: () => {
      this.isLoading = false;
      this.notificationService.success('Productos cargados correctamente');
    }
  }));
  }

  onEdit(product: ProductOverview): void {
    this.router.navigate([`/admin/products/${product.productId}/edit`]);
    this.productsFacade.setSelectedProduct(product);
    console.log('Editar producto:', product);
  }

  onDelete(product: Product): void {
    console.log('Eliminar producto:', product);
  }

  setTypeFilter(type: ProductType = ProductType.other) {
    this.activeType = type;
  }

  filteredProducts(products: Product[]): Product[] {
    return this.activeType === ProductType.all ? products : products.filter(product => product.type === this.activeType);
  }
}
