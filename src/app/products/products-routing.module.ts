import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsTableComponent } from './products-table/products-table.component';
import { ProductsFormComponent } from './products-form/products-form.component';

const routes: Routes = [
  { path: '', component: ProductsTableComponent },
  { path: 'crear', component: ProductsFormComponent },
  { path: 'editar/:id', component: ProductsFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
