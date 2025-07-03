import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Role } from '@enums/role.enum';
import { UserFacade } from '@facades/users.facade';
import { User } from '@models/user';
import { ListContainerComponent } from '@shared/list-container/list-container.component';
import { EMPTY, Observable } from 'rxjs';
import { RoleLabels } from '@enums/role.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  imports: [ListContainerComponent, CommonModule, MatIconModule, MatTableModule, MatButtonModule],
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit{
  isLoading = false;
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];

  users$: Observable<User[] | undefined> = EMPTY

  constructor(private userFacade: UserFacade, private router: Router) {}

  ngOnInit(): void {
    this.users$ = this.userFacade.users();
  }

  onEdit(user: User) {
    this.router.navigate([`/admin/users/${user.id}/edit`]);
  }

  getRoleLabel(role: Role): string {
    const found = RoleLabels.find(label => label.value === role);
    return found ? found.label : '';
  }
}
