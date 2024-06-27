import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersTableComponent } from './customers-table/customers-table.component';
import { CustomersFormComponent } from './customers-form/customers-form.component';

const routes: Routes = [
  { path: '', component: CustomersTableComponent },
  { path: 'crear', component: CustomersFormComponent },
  { path: 'editar/:id', component: CustomersFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
