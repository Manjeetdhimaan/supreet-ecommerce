import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LightboxModule } from 'ng-gallery/lightbox';
import { GalleryModule } from 'ng-gallery';
import { ProductComponent } from './components/reusuable-components/product/product.component';
import { CategoryComponent } from './components/reusuable-components/category/category.component';
import { InputNumberComponent } from './components/ui-components/input-number/input-number.component';
import { ProductGalleryComponent } from './components/ui-components/product-gallery/product-gallery.component';

@NgModule({
  declarations: [
    ProductComponent,
    CategoryComponent,
    InputNumberComponent,
    ProductGalleryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    GalleryModule.withConfig({
      thumbView: 'contain',
    }),
    LightboxModule
  ],
  exports: [
    ProductComponent,
    CategoryComponent,
    InputNumberComponent,
    ProductGalleryComponent
  ]
})
export class SharedModule { }
