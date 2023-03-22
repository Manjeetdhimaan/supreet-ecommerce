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

  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.products = this.productService.products;
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['name']) {
        // this._getProduct(params['id']);
        this._getProducts(params['name']);
        this.products = this.productService.products;
      }
    })
  }

  private _getProducts(categoriesFilter?: any) {
    this.isLoadingProducts = true;
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
