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
  sizes: any[] = [];


  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.sizes = this.productService.sizes;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.scrollTop();
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['name']) {
        const updatedName = params['name'].split('-').join(' ');
        this.collectionName = updatedName;
        this._getProducts(updatedName);
      }
    })
  }

  scrollTop() {
    window.scrollTo({
      top: 0
    })
  }

  sizeFilter(filterType: string, value: any) {
    this.isLoadingCategories = true;
    const selectedSizes = this.sizes.filter(size => size.checked).map(size => size.value);
    const updatedName = this.collectionName.split('-').join(' ');
    const queryParams: any = {};
    if (filterType === 'sizes' && selectedSizes.length > 0) {
      queryParams.sizes = selectedSizes.join(':')
    }
    if (filterType === 'weight') {
      queryParams.weight = value
    }
    if (selectedSizes.length <= 0) {
      this.router.navigate([`/products/collections/${updatedName}`]);
      // this.ngOnInit();
      return;
    }
    this.router.navigate([`/products/collections/${updatedName}`], {
      queryParams: queryParams, queryParamsHandling: 'merge'
    });
  }

  private _getProducts(filters?: any) {
    this.isLoadingProducts = true;
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      if (queryParams) {
        filters = Object.assign({}, { categories: filters, sizes: queryParams['sizes'], weight: queryParams['weight'], price: queryParams['price'] })
        // getting products with filters
        this.productService.getProducts(filters).subscribe((res: ProductsResponse) => {
          // marking filter value as checked when after refreshing or loading page
          this.sizes.map(size => {
            size.checked = (queryParams['sizes']?.split(':').includes(size.value));
          })
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

  onClearFilters() {
    const updatedName = this.collectionName.split(' ').join('-')
    this.router.navigate([`/products/collections/${updatedName}`])
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
