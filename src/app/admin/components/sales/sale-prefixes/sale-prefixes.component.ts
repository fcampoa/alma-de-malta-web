import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { PurchaseOrderNumberPrefix } from '@models/sale';
import { Router, RouterModule } from '@angular/router';
import { ListContainerComponent } from '@shared/list-container/list-container.component';
import { EMPTY, Observable } from 'rxjs';
import { SaleFacade } from '@facades/sale-facade';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sale-prefixes',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, RouterModule, ListContainerComponent, MatIconModule, MatButtonModule],
  templateUrl: './sale-prefixes.component.html',
  styleUrl: './sale-prefixes.component.scss'
})
export class SalePrefixesComponent implements OnInit {
  prefixes$: Observable<PurchaseOrderNumberPrefix[]> = EMPTY;

  constructor(private saleFacade: SaleFacade, private router: Router) { }

  ngOnInit() {
    this.prefixes$ = this.saleFacade.purchaseOrderNumberPrefixes();
    this.saleFacade.getPurchaseOrderNumberPrefixes();
  }

  onEdit(prefix: PurchaseOrderNumberPrefix): void {
    this.router.navigate([`/admin/sales/prefixes/${prefix.id}/edit`]);
    this.saleFacade.setSelectedPurchaseOrderNumberPrefix(prefix);
  }
}
