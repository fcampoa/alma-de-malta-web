import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BackButtonComponent } from '@shared/back-button/back-button.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, BackButtonComponent, MatProgressSpinner],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {

  @Input() showBackButton: boolean = true;
  @Input() isLoading: boolean = false;

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

