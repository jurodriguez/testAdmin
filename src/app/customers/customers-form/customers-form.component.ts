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
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../../services/base.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customers-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './customers-form.component.html',
  styleUrl: './customers-form.component.css',
  providers: [
    { provide: 'endpoint', useValue: 'clientes' }, // Provide endpoint token
    BaseService, // Provide BaseService
  ],
})
export class CustomersFormComponent implements OnInit {
  customerForm: FormGroup;
  isEditMode: boolean = false;
  customerId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customersService: BaseService<Customer>,
    private snackBar: MatSnackBar
  ) {
    this.customerForm = this.fb.group({
      id: [0],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.customerId = +id;
        this.loadCustomer(this.customerId);
      }
    });
  }

  loadCustomer(id: number): void {
    this.customersService.getById(id).subscribe({
      next: (customer) => {
        this.customerForm.patchValue(customer);
      },
      error: (error) => {
        this.snackBar.open(
          `Error loading customer data: ${error.message}`,
          'Close',
          {
            duration: 3000,
          }
        );
      },
    });
  }

  saveCustomer(): void {
    if (this.customerForm.valid) {
      const customerData = this.customerForm.value;
      if (this.isEditMode) {
        this.customersService.update(this.customerId!, customerData).subscribe(
          () => {
            this.snackBar.open('Customer updated successfully', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/clientes']);
          },
          (error) => {
            this.snackBar.open(
              `Error updating customer: ${error.message}`,
              'Close',
              {
                duration: 3000,
              }
            );
          }
        );
      } else {
        this.customersService.create(customerData).subscribe(
          () => {
            this.snackBar.open('Customer created successfully', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/clientes']);
          },
          (error) => {
            this.snackBar.open(
              `Error creating customer: ${error.message}`,
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
    this.router.navigate(['/clientes']);
  }
}
