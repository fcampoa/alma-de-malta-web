import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from './models/product';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { AuthFacade } from '@facades/auth-facade';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, SideBarComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'alma-de-malta-web';
  products!: Product[];
  isSideBarOpen = false;

  constructor(private authFacade: AuthFacade) {
  }
  ngOnInit() {
    this.authFacade.checkLoggedIn();
  }

  toggleSideBar() {
    this.isSideBarOpen = !this.isSideBarOpen;
    console.log(this.isSideBarOpen);
  }
}
