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
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products-table',
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
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css',
  providers: [
    { provide: 'endpoint', useValue: 'productos' }, // Provide endpoint token
    BaseService, // Provide BaseService
  ],
})
export class ProductsTableComponent implements OnInit {
  productsData: any[] = [];
  columns: string[] = ['id', 'nombre', 'tipo', 'clienteId', 'clienteNombre'];
  totalElements: number = 0;

  constructor(
    private productsService: BaseService<Product>,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getAll().subscribe({
      next: (response) => {
        this.productsData = response.data;
        this.totalElements = response.totalElements;
      },
      error: (error) => {
        this.snackBar.open(
          `Error loading products: ${error.message}`,
          'Close',
          {
            duration: 3000,
          }
        );
      },
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/productos/crear']);
  }

  navigateToEdit(id: number): void {
    this.router.navigate([`/productos/editar/${id}`]);
  }
}
