import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LightboxModule } from 'ng-gallery/lightbox';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { GalleryModule } from 'ng-gallery';
import { ProductComponent } from './components/reusuable-components/product/product.component';
import { CategoryComponent } from './components/reusuable-components/category/category.component';
import { InputNumberComponent } from './components/ui-components/input-number/input-number.component';
import { ProductGalleryComponent } from './components/ui-components/product-gallery/product-gallery.component';
import { SnackbarComponent } from './components/ui-components/snackbar/snackbar.component';
import { AnimateDirective } from './directives/animate.directive';
import { FeaturedProductsComponent } from './components/reusuable-components/featured-products/featured-products.component';
import { SearchComponent } from './components/ui-components/search/search.component';

@NgModule({
  declarations: [
    ProductComponent,
    CategoryComponent,
    InputNumberComponent,
    ProductGalleryComponent,
    SnackbarComponent,
    AnimateDirective,
    FeaturedProductsComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    GalleryModule.withConfig({
      thumbView: 'contain',
    }),
    LightboxModule,
    CarouselModule
  ],
  exports: [
    ProductComponent,
    CategoryComponent,
    InputNumberComponent,
    ProductGalleryComponent,
    SnackbarComponent,
    AnimateDirective,
    FeaturedProductsComponent
  ]
})
export class SharedModule { }
