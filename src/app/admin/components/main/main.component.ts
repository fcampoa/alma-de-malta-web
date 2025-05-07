import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../../../shared/side-bar/side-bar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
