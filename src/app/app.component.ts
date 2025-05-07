import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from './models/product';
import { TopBarComponent } from './shared/top-bar/top-bar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, TopBarComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'alma-de-malta-web';
  products!: Product[];

  constructor() {
  }
}
