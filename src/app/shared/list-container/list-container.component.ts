import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-container',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule, MatProgressSpinner],
  templateUrl: './list-container.component.html',
  styleUrl: './list-container.component.scss'
})
export class ListContainerComponent {

  constructor(private router: Router) { }

  @Input() title: string = 'Lista';
  @Input() addRoute!:string;
  @Input() isLoading: boolean = false;

  onAdd(): void {
    this.router.navigate([this.addRoute]);
  }
}
