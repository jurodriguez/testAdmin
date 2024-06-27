import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomersTableComponent } from './customers-table/customers-table.component';
import { CustomersFormComponent } from './customers-form/customers-form.component';
import { TableComponent } from '../shared/table/table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from '../app.routes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    CustomersTableComponent,
    CustomersFormComponent,
    TableComponent,
    AppRoutingModule,
  ],
  providers: [provideHttpClient()],
})
export class CustomersModule {}
