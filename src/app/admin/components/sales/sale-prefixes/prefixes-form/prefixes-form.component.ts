import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ContainerComponent } from '@shared/container/container.component';
import { PurchaseOrderNumberPrefix } from '@models/sale';
import { SaleFacade } from '@facades/sale-facade';
import { ActivatedRoute } from '@angular/router';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-prefixes-form',
  imports: [
    ContainerComponent,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  standalone: true,
  templateUrl: './prefixes-form.component.html',
  styleUrl: './prefixes-form.component.scss'
})
export class PrefixesFormComponent implements OnInit {
  prefix!: PurchaseOrderNumberPrefix;

  prefixForm!: FormGroup;

  constructor(private fb: FormBuilder, private saleFacade: SaleFacade, private route: ActivatedRoute) { }

  ngOnInit() {
    this.prefixForm = this.fb.group({
      prefix: [this.prefix?.prefix || '', [Validators.required, Validators.maxLength(5)]],
      description: [this.prefix?.description || '', [Validators.maxLength(100)]],
      number: [this.prefix?.number || 1, [Validators.required, Validators.min(1)]]
    });
    let id;
    if ((id = this.route.snapshot.params['id'])) {
      this.loadPrefix(id);
    }
  }

  onSubmit() {
    if (this.prefixForm.valid) {
      this.prefix = {id: this.prefix?.id, ...this.prefixForm.value as PurchaseOrderNumberPrefix };
      if (this.prefix.id) {
        this.saleFacade.updatePurchaseOrderNumberPrefix(this.prefix);
        return;
      }
        this.saleFacade.createPurchaseOrderNumberPrefix(this.prefix);
      }
  }

  loadPrefix(prefixId: string) {
    this.saleFacade.getPurchaseOrderNumberPrefixById(prefixId);
    this.saleFacade.getSelectedPurchaseOrderNumberPrefix().subscribe((prefix) => {
      if (prefix) {
        this.prefix = prefix;
        this.prefixForm.patchValue({
          prefix: prefix.prefix,
          description: prefix.description,
          nextNumber: prefix.number
        });
      }
    });
  }
}
