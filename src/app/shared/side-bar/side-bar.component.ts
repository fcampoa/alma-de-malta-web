import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { TopBarComponent } from '@shared/top-bar/top-bar.component';
import { EMPTY, Observable } from 'rxjs';
import { User } from '@models/user';
import { Role } from '@enums/role.enum';
import { AuthFacade } from '@facades/auth-facade';
import { UserFacade } from '@facades/users.facade';
import { CommonModule } from '@angular/common';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatSidenavModule,
            MatToolbarModule,
            MatIconModule,
            MatButtonModule,
            MatListModule,
            RouterModule,
            MatExpansionModule,
            TopBarComponent,
            CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  @Input() isSideBarOpen = false;
  menuIcon = 'menu';
  @ViewChild('drawer') drawer!: MatSidenav;
  user$: Observable<User | undefined> = EMPTY;
  Role = Role;
  env = environment
  constructor(private authFacade: AuthFacade, private userFacade: UserFacade) { }

  ngOnInit() {
    this.user$ = this.userFacade.getSelectedUser();
  }

  onDrawerChange(opened: boolean) {
    this.menuIcon = opened ? 'close' : 'menu';
  }

  closeIfMobile() {
    if (window.innerWidth <= 960) {
      this.drawer.close();
    }
  }

  toggleSideBar() {
    this.isSideBarOpen = !this.isSideBarOpen;
    console.log(this.isSideBarOpen);
  }
}
