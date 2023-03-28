import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductComponent } from './components/reusuable-components/product/product.component';
import { CategoryComponent } from './components/reusuable-components/category/category.component';
import { InputNumberComponent } from './components/ui-components/input-number/input-number.component';
import { SnackbarComponent } from './components/ui-components/snackbar/snackbar.component';
import { AnimateDirective } from './directives/animate.directive';
import { FeaturedProductsComponent } from './components/reusuable-components/featured-products/featured-products.component';
import { SearchComponent } from './components/ui-components/search/search.component';

@NgModule({
  declarations: [
    ProductComponent,
    CategoryComponent,
    InputNumberComponent,
    SnackbarComponent,
    AnimateDirective,
    FeaturedProductsComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule,
    FormsModule
  ],
  exports: [
    ProductComponent,
    CategoryComponent,
    InputNumberComponent,
    SnackbarComponent,
    AnimateDirective,
    FeaturedProductsComponent,
    SearchComponent
  ]
})
export class SharedModule { }
