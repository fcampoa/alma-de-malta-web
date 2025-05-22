import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss'
})
export class BackButtonComponent {
  constructor(private location: Location) { }
  goBack() {
    this.location.back();
  }
}
