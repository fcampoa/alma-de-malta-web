import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Role, RoleLabels } from '@enums/role.enum';
import { UserFacade } from '@facades/users.facade';
import { User } from '@models/user';
import { ContainerComponent } from '@shared/container/container.component';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-users-form',
  imports: [ContainerComponent, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss'
})
export class UsersFormComponent implements OnInit {
  isLoading = false;
  roles = RoleLabels;
  userForm!: FormGroup;
  user!: User;
  user$: Observable<Role | undefined> = EMPTY;

  constructor(private userFacade: UserFacade, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      role: ['', [Validators.required]]
    });
    let id;
    if ((id = this.route.snapshot.params['id'])) {
      this.loadUser(id);
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      debugger;
      this.parseUser();
    if (this.user.id) {
        // Update existing user
        this.userFacade.updateUser(this.user);
      } else {
        // Create new user
        this.userFacade.createUser(this.user);
      }
    }
  }

  loadUser(id: any) {
    this.userFacade.getUserById(id);
    this.userFacade.getSelectedUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.userForm.patchValue({
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        });
      }
    });
  }

  parseUser() {
    this.user = {
      id: this.user?.id,
      authProviderId: this.user?.authProviderId,
      ...this.userForm.value as User,
    };
  }

  patchUser(user: User) {
    this.userForm.patchValue({
      ...user
    });
  }
}
