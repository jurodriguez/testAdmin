import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TableComponent } from '../../shared/table/table.component';
import { Router } from '@angular/router';
import { BaseService } from '../../services/base.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customers-table',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    TableComponent,
  ],
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.css',
  providers: [
    { provide: 'endpoint', useValue: 'clientes' }, // Provide endpoint token
    BaseService, // Provide BaseService
  ],
})
export class CustomersTableComponent implements OnInit {
  customersData: any[] = [];
  columns: string[] = ['id', 'nombre', 'correo', 'fechaNacimiento'];
  totalElements: number = 0;

  constructor(
    private customersService: BaseService<Customer>,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customersService.getAll().subscribe({
      next: (response) => {
        this.customersData = response.data;
        this.totalElements = response.totalElements;
      },
      error: (error) => {
        this.snackBar.open(
          `Error loading customers: ${error.message}`,
          'Close',
          {
            duration: 3000,
          }
        );
      },
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/clientes/crear']);
  }

  navigateToEdit(id: number): void {
    this.router.navigate([`/clientes/editar/${id}`]);
  }
}
