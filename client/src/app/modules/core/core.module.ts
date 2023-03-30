import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { AboutComponent } from './about/about.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

const routes: Routes = [
  {
    path: '', component: HomeComponent, data: { title: 'Supreet Indian Goods' }
  },
  {
    path: 'cart', component: CartComponent, data: { title: 'Cart' }
  },
  {
    path: 'about', component: AboutComponent, data: { title: 'About us' }
  }
]


@NgModule({
  declarations: [
    HomeComponent,
    CartComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CarouselModule,
    SharedModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'progress' })
  ]
})
export class CoreModule { }
