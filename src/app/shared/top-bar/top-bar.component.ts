import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { Role } from '../../enums/role.enum';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  user$: Observable<User> = EMPTY; // Replace 'any' with your actual user type
  Role = Role; // Expose the Role enum to the template

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.user$ = this.authService.loggedUser();
  }

  toggle() {
    this.toggleSidenav.emit();
  }
}
