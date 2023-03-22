import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o/public_api';

import { Product } from 'src/app/shared/models/product.model';
import { ProductsResponse } from 'src/app/shared/models/responses.model';
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

  products: Product[] = [];
  isLoadingProducts = false;
  isLoadingCategories = false;
  isCategoryPage = false;
  serverErrMsg: string;

  constructor( private productService: ProductService, private activatedRoute: ActivatedRoute ) {
    this._getProducts();
  }

  private _getProducts(categoriesFilter?: any) {
    this.isLoadingProducts = true;
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      if(queryParams['categories']) {
        categoriesFilter = queryParams['categories'];
        // getting products with filters
        this.productService.getProducts(categoriesFilter).subscribe((res: ProductsResponse) => {
          // marking filter value as checked when after refreshing or loading page
          // this.categories.map(category => {
          //     category.checked = (categoriesFilter.indexOf(category._id) > -1);
          // })
          if (!res['products']) {
            this.products = [];
          }
          else {
            this.products = res['products'];
          }
          this.isLoadingProducts = false;
          this.isLoadingCategories = false;
          this.serverErrMsg = '';
        }, err => {
          this.isLoadingProducts = false;
          this.isLoadingCategories = false;
          this._errorHandler(err);
        })
      }
      else {
        // getting products without filters
        this.productService.getProducts(categoriesFilter).subscribe((res: ProductsResponse) => {
          if (!res['products']) {
            this.products = [];
          }
          else {
            this.products = res['products'];
          }
          this.isLoadingProducts = false;
          this.isLoadingCategories = false;
          this.serverErrMsg = '';
        }, err => {
          this.isLoadingProducts = false;
          this.isLoadingCategories = false;
          this._errorHandler(err);
        })
      }
    })
  }

  private _errorHandler(err: HttpErrorResponse) {
    if (err.error['message']) {
      if (err.error['message'] === 'No Products found' && err.status === 404) {
        this.products = [];
      }
      this.serverErrMsg = err.error['message'];
    } else {
      this.serverErrMsg = 'An error occured. Please try again!';
    }
  }

}
