import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ProductFacade } from '../../../../State/facades/product-facade';
import { EMPTY, Observable } from 'rxjs';
import { Product } from '../../../../models/product';
import { ProductType } from '../../../../enums/product-type.enum';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  products$: Observable<Product[]> = EMPTY;
  displayedColumns: string[] = ['name', 'description', 'price', 'stock', 'actions'];
  productTypes = ProductType;

  activeType: ProductType = ProductType.all;

  constructor(private productsFacade: ProductFacade, private router: Router) { }

  ngOnInit(): void {
    this.productsFacade.getProducts();
    this.products$ = this.productsFacade.Products();
  }

  onAdd(): void {
    this.productsFacade.setSelectedProduct(null);
    this.router.navigate(['/admin/products']);
    console.log('Agregar producto');
  }

  onEdit(product: Product): void {
    debugger;
    this.productsFacade.setSelectedProduct(product);
    this.router.navigate(['/admin/products']);
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
