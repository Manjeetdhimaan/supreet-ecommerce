import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from 'src/app/shared/models/product.model';
import { ProductResponse } from 'src/app/shared/models/responses.model';

import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';

export interface GalleryImageData {
  srcUrl: string;
  previewUrl: string
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  imageData: GalleryImageData[] = [];
  product: Product;
  products: Product[];
  quantity: number = 1;
  isAddedToCart = false;
  isSnackbarShown = false;
  isLoading = false;
  isLoadingCart = false;
  serverErrMsg: string;
  customOptionsRelated: OwlOptions = {
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

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private cartService: CartService, private router: Router ) { }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this._getProduct(params['id']);
        this.products = this.productService.products;
      }
    })
  }

  private _getProduct(id: string) {
    this.serverErrMsg = '';
    this.isLoading = true;
    this.productService.getProduct(id).subscribe((res: ProductResponse) => {
      this.product = res['product'];
      this.imageData.push({
        srcUrl: this.product.image,
        previewUrl: this.product.image
      })
      this.product.images.map((imageUrl: string) => {
        this.imageData.push({
          srcUrl: imageUrl,
          previewUrl: imageUrl
        })
      })
      this.serverErrMsg = '';
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
      this._errorHandler(err);
      console.log(err)
    });
  }

  private _errorHandler(err: HttpErrorResponse) {
    if (err.error['message']) {
      this.serverErrMsg = err.error['message'];
    } else {
      this.serverErrMsg = 'An error occured. Please try again!';
    }
  }

  onAddtoCart(productId: string) {
    const cartItem = {
      productId: productId,
      quantity: this.quantity
    }
    this.isSnackbarShown = true;
    this.cartService.setCartToLocalStorage(cartItem);
  }

  onUpdateQuantity(value: number) {
    this.quantity = value
  }
}
