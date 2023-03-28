import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { take } from 'rxjs';

import { CartProduct } from 'src/app/shared/models/cart.model';
import { Category } from 'src/app/shared/models/category.model';
import { Product } from 'src/app/shared/models/product.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';

interface PurchaseItems {
  name: string;
  productId: any;
  quantity: number;
  size: any;
  color: any;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: CartProduct[] = [];
  categories: Category[] = [];
  serverErrMsg: string;

  constructor(private productService: ProductService, private cartService: CartService) { }
  ngOnInit(): void {
    this.scrollTop();
    this._getLocalStorageCart();
  }

  scrollTop() {
    window.scrollTo({
      top: 0
    })
  }

  private _getLocalStorageCart() {
    this.cartService.cart$.pipe(take(1)).subscribe(respCart => {
      if (respCart && respCart.items.length > 0) {
        respCart.items.forEach(cartItem => {
          this.productService.getProduct(cartItem.productId).subscribe(res => {
            this.cartItems.push({
              product: res['product'],
              quantity: cartItem['quantity'],
              size: cartItem.size,
              color: cartItem.color,
              productId: res['product']._id
            });
          }, err => {
            this._errorHandler(err);
          });
        })
      }
    });
  }

  private _errorHandler(err: HttpErrorResponse) {
    if (err.error['message']) {
      this.serverErrMsg = err.error['message'];
    } else {
      this.serverErrMsg = 'An error occured. Please try again!';
    }
  }

  onUpdateQuantity(value: number, product: Product) {
    // product.quantity = value;
    this.cartItems.map(cartItem => {
      if (cartItem.product._id === product._id) {
        cartItem.quantity = +value
      }
    })
    this.cartService.setCartToLocalStorage({
      quantity: +value,
      productId: product._id
    }, true);
  }

  onDeleteItemFromCart(productId: string, index: number) {
    this.cartService.deleteItemFromCart(productId);
    this.cartItems.splice(index, 1);
  }

  onCheckOut() {
    let checkoutMsg = 'Hi, I want to purchase Products - ';
    const purchasableItems: PurchaseItems[] = []
    this.cartItems.map(cartItem => {
      purchasableItems.push({
        name: cartItem.product.name,
        quantity: cartItem.quantity,
        size: cartItem.size,
        color: cartItem.color,
        productId: cartItem.productId
      })
    });
    purchasableItems.map(item => {
      checkoutMsg +=  '(Name: "' + item.name + '", ' + 'quantity: ' + item.quantity + ', ' + 'size: ' + item.size + ', ' + 'color: ' + item.color + ', ' + 'Product ID: ' + item.productId + '),,,, '
    });
    checkoutMsg = checkoutMsg.trim().slice(0, -1) + '---------------Total Price - $'+this.subTotal();
    location.href = "https://api.whatsapp.com/send?phone=9878627074&text=" + checkoutMsg;
  }

  onClearCart() {
    this.cartItems = [];
    this.cartService.emptyCart();
  }

  subTotal() {
    return Number(this.cartItems.reduce((acc, item) => {
      return acc + (+item.product.currentPrice * item.quantity);
    }, 0));
  }
}
