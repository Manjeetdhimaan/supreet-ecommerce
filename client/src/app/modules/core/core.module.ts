import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, data: { title: 'Supreet Indian Goods' }
  },
  {
    path: 'cart', component: CartComponent, data: { title: 'Cart' }
  }
]


@NgModule({
  declarations: [
    HomeComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CarouselModule,
    SharedModule
  ]
})
export class CoreModule { }
