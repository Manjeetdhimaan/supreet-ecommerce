import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './components/reusuable-components/product/product.component';
import { CategoryComponent } from './components/reusuable-components/category/category.component';



@NgModule({
  declarations: [
    ProductComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductComponent,
    CategoryComponent
  ]
})
export class SharedModule { }
