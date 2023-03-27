import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxCheckboxModule } from 'ngx-checkbox';

import { SharedModule } from 'src/app/shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CollectionComponent } from './collection/collection.component';

const routes: Routes = [
  {
    path: ':id', component: ProductDetailsComponent, data: { title: 'Product details' }
  },
  {
    path: 'collections/:name', component: CollectionComponent, data: { title: 'Product Collections' }
  }
]

@NgModule({
  declarations: [
    ProductDetailsComponent,
    CollectionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CarouselModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'progress' }),
    FormsModule,
    NgxCheckboxModule
  ]
})
export class ProductModule { }
