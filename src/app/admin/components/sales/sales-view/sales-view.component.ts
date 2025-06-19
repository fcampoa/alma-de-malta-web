import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../../../shared/container/container.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductFacade } from '../../../../State/facades/product-facade';
import { EMPTY, Observable, tap } from 'rxjs';
import { Product } from '../../../../models/product';
import { ProductType } from '../../../../enums/product-type.enum';
import { ProductCategory } from '../../../../enums/product-category.enum';

@Component({
  selector: 'app-sales-view',
  imports: [ContainerComponent, MatButtonModule, MatCardModule],
  standalone: true,
  templateUrl: './sales-view.component.html',
  styleUrl: './sales-view.component.scss'
})
export class SalesViewComponent implements OnInit {
  
  products!: Product[];
  productRows: any[][] = [];

  products$: Observable<Product[]> = EMPTY;

  constructor(private productFacade: ProductFacade) { }

  ngOnInit() {
    // Cargar productos desde el facade
    this.productFacade.searchProducts({ isActive: true, productType: ProductType.retail, productCategory: ProductCategory.beer });
    this.products$ = this.productFacade.Products().pipe(tap(products => this.products = products));
    this.productRows = [];
    for (let i = 0; i < this.products.length; i += 3) {
      this.productRows.push(this.products.slice(i, i + 3));
    }
  }

  addToCart(product: any) {
    // Lógica para agregar al carrito
    console.log('Agregado al carrito:', product);
  }
}
