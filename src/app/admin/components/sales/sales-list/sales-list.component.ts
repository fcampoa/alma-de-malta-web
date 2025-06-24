import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { SaleFacade } from '@facades/sale-facade';
import { Sale } from '@models/sale';
import { ListContainerComponent } from '@shared/list-container/list-container.component';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-sales-list',
  imports: [ListContainerComponent, CommonModule, MatTableModule],
  standalone: true,
  templateUrl: './sales-list.component.html',
  styleUrl: './sales-list.component.scss'
})
export class SalesListComponent implements OnInit {

  displayedColumns: string[] = ['folio', 'date', 'total', 'status'];

  sales$: Observable<Sale[]> = EMPTY;

  constructor(private saleFacade: SaleFacade) {
  }

  ngOnInit(): void {
    this.saleFacade.getSales();
    this.sales$ = this.saleFacade.sales();
  }

}
