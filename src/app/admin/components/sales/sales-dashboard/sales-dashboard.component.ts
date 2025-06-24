import { Component, OnInit } from '@angular/core';
import { ListContainerComponent } from '../../../../shared/list-container/list-container.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EMPTY, Observable } from 'rxjs';
import { SaleDashboard, SaleDashboardOverview } from '../../../../models/sale';
import { SaleFacade } from '../../../../State/facades/sale-facade';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-dashboard',
  imports: [ListContainerComponent, MatTableModule, MatIconModule, MatButtonModule, CommonModule],
  standalone: true,
  templateUrl: './sales-dashboard.component.html',
  styleUrl: './sales-dashboard.component.scss'
})
export class SalesDashboardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'products', 'actions'];
  dashboards$: Observable<SaleDashboardOverview[]> = EMPTY;

  constructor(private saleFacade: SaleFacade, private router: Router) { }

  ngOnInit(): void {
    this.dashboards$ = this.saleFacade.saleDashboards();
  }

  onEdit(dashboard: SaleDashboard): void {
    this.router.navigate([`/admin/sales/dashboard/${dashboard.id}/edit`]);
  }

  onDelete(dashboard: SaleDashboard): void {
  }

}
