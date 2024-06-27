import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../../services/base.service';
import { Product } from '../../models/product.model';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.css',
  providers: [
    { provide: 'endpoint', useValue: 'productos' }, // Provide endpoint token
    BaseService, // Provide BaseService
  ],
})
export class ProductsFormComponent implements OnInit {
  productForm: FormGroup;
  customers: any[] = [];
  isEditMode: boolean = false;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productsService: BaseService<Product>,
    private customersService: CustomersService,
    private snackBar: MatSnackBar
  ) {
    this.productForm = this.fb.group({
      id: [0],
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      clienteId: [0, Validators.required],
      clienteNombre: [''],
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
    this.validateParameters();
    this.updateName();
  }

  validateParameters(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.productId = +id;
        this.loadProduct(this.productId);
      }
    });
  }

  loadProduct(id: number): void {
    this.productsService.getById(id).subscribe({
      next: (customer) => {
        this.productForm.patchValue(customer);
      },
      error: (error) => {
        this.snackBar.open(
          `Error loading product data: ${error.message}`,
          'Close',
          {
            duration: 3000,
          }
        );
      },
    });
  }

  loadCustomers(): void {
    this.customersService.getAll().subscribe((response) => {
      this.customers = response.data;
    });
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      if (this.isEditMode) {
        this.productsService.update(this.productId!, productData).subscribe(
          () => {
            this.snackBar.open('Product updated successfully', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/productos']);
          },
          (error) => {
            this.snackBar.open(
              `Error updating product: ${error.message}`,
              'Close',
              {
                duration: 3000,
              }
            );
          }
        );
      } else {
        this.productsService.create(productData).subscribe(
          () => {
            this.snackBar.open('Product created successfully', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/productos']);
          },
          (error) => {
            this.snackBar.open(
              `Error creating product: ${error.message}`,
              'Close',
              {
                duration: 3000,
              }
            );
          }
        );
      }
    }
  }

  back(): void {
    this.router.navigate(['/productos']);
  }

  updateName(): void {
    this.productForm.get('clienteId')?.valueChanges.subscribe((clienteId) => {
      const selectedCustomer = this.customers.find(
        (customer) => customer.id === clienteId
      );
      if (selectedCustomer) {
        this.productForm
          .get('clienteNombre')
          ?.setValue(selectedCustomer.nombre);
      }
    });
  }
}
