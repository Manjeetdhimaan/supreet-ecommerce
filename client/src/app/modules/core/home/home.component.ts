import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o/public_api';

import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  customOptionshome: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    items: 1,
    margin: 0,
    autoplay: false,
    autoplayTimeout: 3000,
    autoplaySpeed: 1500,
    autoplayHoverPause: true,
    navSpeed: 5000,
    nav: false
  }

  customOptionsFeatures: OwlOptions = {
    items: 4,
    nav: false,
    dots: true,
    loop: false,
    margin: 20,
    responsive: {
      0: {
        items: 2
      },
      768: {
        items: 3
      },
      992: {
        items: 4,
        dots: false,
        nav: true
      }
    }
  }

  customOptionsShipping: OwlOptions = {
    'items': 4,
    'nav': false,
    'dots': false,
    'autoplay': true,
    'autoplayTimeout': 7000,
    'margin': 20,
    'responsive': {
      '0': {
        'items': 1
      },
      '576': {
        'items': 2
      },
      '768': {
        'items': 3
      },
      '992': {
        'items': 4,
        'autoplay': false
      }
    }
  }

  customOptionsInsta: OwlOptions = {
    'items': 5,
    'nav': false,
    'dots': false,
    'margin': 20,
    'autoplay': true,
    'responsive': {
      '0': {
        'items': 2
      },
      '576': {
        'items': 3
      },
      '992': {
        'items': 4
      },
      '1200': {
        'items': 5
      }
    }
  }

  products: Product[];

  constructor( private productService: ProductService ) {
    this.products = this.productService.products;
  }

}
