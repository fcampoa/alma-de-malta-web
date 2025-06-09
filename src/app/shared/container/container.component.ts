import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {

  constructor(private router: Router, private location: Location) { }


  goHome() {
    this.router.navigate(['/']);
  }

  back() {
    this.location.back();
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }
}

