import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';

const data = [
  {
    srcUrl: 'assets/images/demos/demo2/product/product-1-580x652.jpg',
    previewUrl: 'assets/images/demos/demo2/product/product-1-580x652.jpg'
  },
  {
    srcUrl: 'assets/images/demos/demo2/product/product-2-580x652.jpg',
    previewUrl: 'assets/images/demos/demo2/product/product-2-580x652.jpg'
  },
  {
    srcUrl: 'assets/images/demos/demo2/product/product-3-580x652.jpg',
    previewUrl: 'assets/images/demos/demo2/product/product-3-580x652.jpg'
  },
  {
    srcUrl: 'assets/images/demos/demo2/product/product-3-580x652.jpg',
    previewUrl: 'assets/images/demos/demo2/product/product-3-580x652.jpg'
  },
  {
    srcUrl: 'assets/images/demos/demo2/product/product-4-580x652.jpg',
    previewUrl: 'assets/images/demos/demo2/product/product-4-580x652.jpg'
  }
];

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
  product: any;
  quantity: number = 1;
  isAddedToCart = false;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private cartService: CartService ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.product = this.productService.getLocalProduct(params['id']);
        this.imageData.push({
          srcUrl: this.product.imageSrc,
          previewUrl: this.product.imageSrc
        })
        this.product.images.map((imageUrl: string) => {
          this.imageData.push({
            srcUrl: imageUrl,
            previewUrl: imageUrl
          })
        })
      }
    })
  }

  onAddtoCart(productId: string) {
    const cartItem = {
      productId: productId,
      quantity: this.quantity
    }
    this.isAddedToCart = true;
    setTimeout(() => {
      this.isAddedToCart = false;
    }, 3000);
    this.cartService.setCartToLocalStorage(cartItem);
  }

  onUpdateQuantity(value: number) {
    this.quantity = value
  }
}
