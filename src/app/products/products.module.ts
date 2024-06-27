import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app.routes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
})
export class ProductsModule {}
