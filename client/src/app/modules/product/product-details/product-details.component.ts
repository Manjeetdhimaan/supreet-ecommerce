import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from 'src/app/shared/models/product.model';
import { ProductResponse, ProductsResponse } from 'src/app/shared/models/responses.model';

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
  @Input() imageData: any[] = [];
  items: GalleryItem[];
  product: Product;
  products: Product[];
  quantity: number = 1;
  isAddedToCart = false;
  isSnackbarShown = false;
  isLoading = false;
  isLoadingCart = false;
  isLoadingProducts = false;
  serverErrMsg: string;
  relatedProdCategory: string = 'men';
  selectedColor: string;
  selectedSize: string;
  isSubmitted = false;
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

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private cartService: CartService, private router: Router, public gallery: Gallery, public lightbox: Lightbox) { }

  ngOnInit() {
    this.isLoading = true;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this._getProduct(params['id']);
      }
    })
    this.scrollTop();


  }

  scrollTop() {
    window.scrollTo({
      top: 0
    })
  }

  private _getProduct(id: string) {
    this.serverErrMsg = '';
    this.productService.getProduct(id).subscribe((res: ProductResponse) => {
      this.product = res['product'];
      this.relatedProdCategory = this.product.categories[1] ? this.product.categories[1] : this.product.categories[0];

      this.product.images[0].imageUrls.map((imageUrl: string) => {
        this.imageData.push({
          srcUrl: imageUrl,
          previewUrl: imageUrl
        })
      });
      this.selectedColor = this.product.colors[0].name;

      this._onSetGalleryImages();

      this.serverErrMsg = '';
      this.isLoading = false;
      this._getRelatedProducts(this.relatedProdCategory);
    }, err => {
      this.isLoading = false;
      this._errorHandler(err);
    });
  }

  private _onSetGalleryImages() {
    this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));
    // Get a lightbox gallery ref
    const lightboxRef = this.gallery.ref('lightbox');
    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });
    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);
  }

  onChangeColor(colorName: string) {
    this.product.images.map(image => {
      if (image.color === colorName) {
        this.selectedColor = colorName;
        this.imageData = [];
        image.imageUrls.map(imageUrl => {
          this.imageData.push({
            srcUrl: imageUrl,
            previewUrl: imageUrl
          })
        });
        this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));
      }
    })
  }

  onSelectSize(size: string) {
    this.selectedSize = size;
  }

  private _getRelatedProducts(filters: any) {
    this.isLoadingProducts = true;
    this.productService.getProducts(filters).subscribe((res: ProductsResponse) => {
      if (!res['products']) {
        this.products = [];
      }
      else {
        this.products = res['products'];
      }
      this.isLoadingProducts = false;
      this.serverErrMsg = '';
    }, err => {
      this.isLoadingProducts = false;
      this._errorHandler(err);
    })
  }

  private _errorHandler(err: HttpErrorResponse) {
    if (err.error['message']) {
      this.serverErrMsg = err.error['message'];
    } else {
      this.serverErrMsg = 'An error occured. Please try again!';
    }
  }

  onAddtoCart(productId: string) {
    this.isSubmitted = true;
    if(!this.selectedSize) {
      return;
    }
    const cartItem = {
      productId: productId,
      quantity: this.quantity,
      color: this.selectedColor,
      size: this.selectedSize
    }
    this.isSnackbarShown = true;
    this.cartService.setCartToLocalStorage(cartItem);
  }

  onUpdateQuantity(value: number) {
    this.quantity = value
  }
}
