import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductFacade } from './State/facades/product-facade';
import { Product } from './models/product';
import { debug } from 'console';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'alma-de-malta-web';
  products!: Product[];

  constructor(private productsFacade: ProductFacade) {
    console.log('AppComponent initialized');
    this.productsFacade.getProducts();
    this.productsFacade.Products().subscribe((products: any) => {
      console.log('Products from store:', products);
      debugger;
      this.products = products;
    });
  }
}
