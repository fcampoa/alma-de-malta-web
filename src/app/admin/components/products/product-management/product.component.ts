import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MeasureUnit, MeasureUnitLabels } from '../../../../enums/mesaure-unit.enum';
import { ProductCategory } from '../../../../enums/product-category.enum';
import { Product } from '../../../../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductFacade } from '../../../../State/facades/product-facade';
import { ContainerComponent } from '../../../../shared/container/container.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    ContainerComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  productForm!: FormGroup;
  product!: Product;

  measureUnitOptions = MeasureUnitLabels;
  categoryOptions = Object.keys(ProductCategory).filter(key => isNaN(Number(key))).map(key => ({ label: key, value: ProductCategory[key as keyof typeof ProductCategory] }));

  constructor(private facade: ProductFacade, private fb: FormBuilder, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      imageUrl: [''],
      category: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      brand: [''],
      availability: [0, [Validators.min(0)]],
      unit: ['', Validators.required]
    });

    let id;
    if ((id = this.route.snapshot.params['id'])) {
      this.loadProduct(id);
    }
  }

  loadProduct(productId: any) {
    this.facade.getProductById(productId);
    this.facade.getSelectedProduct().subscribe(product => {
      if (product) {
        this.product = product;
        this.patchProduct(this.product);
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.parseProduct();
      if (this.product.id) {
        this.facade.updateProduct(this.product);
        return;
      }
      this.facade.addProduct(this.product);
    }
  }

  patchProduct(product: Product) {
    this.productForm.patchValue({ ...product });
  }

  parseProduct() {
    this.product = {
      id: this.product?.id,
      ... this.productForm.value as Product,
    };
  }
}
