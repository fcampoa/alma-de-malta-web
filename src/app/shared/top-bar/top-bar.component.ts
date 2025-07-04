import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { EMPTY, Observable, tap } from 'rxjs';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { Role } from '../../enums/role.enum';
import { AuthFacade } from '@facades/auth-facade';
import { AuthService } from '@auth0/auth0-angular';
import { UserFacade } from '@facades/users.facade';
import { environment } from 'environments/environment';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, CommonModule, MatMenuModule],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  env = environment
  user$: Observable<User | undefined> = EMPTY; // Replace 'any' with your actual user type
  Role = Role; // Expose the Role enum to the template
  isAuthenticated$: Observable<boolean> = EMPTY;
  logged = false;

  constructor(private authFacade: AuthFacade, private userFacade: UserFacade) { }

  ngOnInit() {
    this.user$ = this.userFacade.getSelectedUser();
    this.authFacade.isAuthenticated().subscribe(isAuthenticated => {
      this.logged = isAuthenticated});
  }

  login() {
    this.authFacade.login();
  }
  logout() {
    this.authFacade.logout();
  }
}
