import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { ProductsResponse } from 'src/app/shared/models/responses.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  products: Product[] = [];
  isFilterBarOpen = false;
  isLoadingProducts = false;
  isLoadingCategories = false;
  isCategoryPage = false;
  serverErrMsg: string;
  collectionName: string;
  categories: any[] = [
    {
      value: 'extra large',
      checked: false
    },
    {
      value: 'large',
      checked: false
    },
    {
      value: 'medium',
      checked: false
    },
    {
      value: 'small',
      checked: false
    },
  ];


  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['name']) {
        this.collectionName = params['name']
        this._getProducts(params['name']);
      }
    })
  }

  sizeFilter(sizeFilter: string) {
    this.isLoadingCategories = true;
    const selectedCategories = this.categories.filter(category => category.checked).map(category => category.value);
    this.router.navigate([`/products/collections/${this.collectionName}`], {
      queryParams: { sizes: selectedCategories, colors: '#F15212' }
    });

    // this.isLoadingCategories = true;
    // // const selectedCategories = this.categories.filter(category => category.checked).map(category => category._id);
    // const selectedCategories = filter;
    // this.router.navigate([`/products/collections/${this.collectionName}`], {queryParams: {sizes: selectedCategories}});
    // // this._getProducts();
  }

  private _getProducts(filters?: any) {
    this.isLoadingProducts = true;
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      if (queryParams['sizes'] || queryParams['colors']) {
        console.log(queryParams)
        filters = Object.assign({}, { categories: filters, sizes: queryParams['sizes'], colors: queryParams['colors'] })
        // getting products with filters
        this.productService.getProducts(filters).subscribe((res: ProductsResponse) => {
          // marking filter value as checked when after refreshing or loading page
          // this.products.map(product => {
          //   this.categories = this.categories.concat(product.sizes);
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
        this.productService.getProducts(filters).subscribe((res: ProductsResponse) => {
          if (!res['products']) {
            this.products = [];
          }
          else {
            this.products = res['products'];
            // this.products.map(product => {
            //   this.categories = this.categories.concat(product.sizes);
            //   console.log('conact', this.categories)
            // })
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

  onOpenFilterSidebar() {
    document.body.classList.add('sidebar-active');
  }

  onCloseFilterSideBar() {
    document.body.classList.remove('sidebar-active');
  }
}
