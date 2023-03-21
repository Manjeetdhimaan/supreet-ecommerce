import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCartItemsFromLocalStorage());
  cartProducts = [];

  constructor() { }

  // localstorage cart handling if user is not logged in
  initCartLocalStorage() {
    const itemCart = {
      items: []
    }
    const initialCartJson = JSON.stringify(itemCart);
    localStorage.setItem(CART_KEY, initialCartJson);
  }

  setItemToLocalStorageCart(fetchedCart: string, cartItem: CartItem, updateQuantity?: boolean) {
    const cart: Cart = JSON.parse(fetchedCart);
    const catrItemExitsIndex = cart.items.findIndex(item => item.productId === cartItem.productId);
    if (catrItemExitsIndex >= 0) {
      if (updateQuantity) {
        cart.items[catrItemExitsIndex].quantity = cartItem.quantity;
      }
      else {
        let newQuantity = cartItem.quantity;
        newQuantity = cart.items[catrItemExitsIndex].quantity + newQuantity;
        cart.items[catrItemExitsIndex].quantity = newQuantity;
      }
    }
    else {
      cart.items.push(cartItem);
    }
    const cartJson = JSON.stringify(cart);
    this.cart$.next(cart);
    localStorage.setItem(CART_KEY, cartJson);
  }

  getCartItemsFromLocalStorage() {
    const fetchedCart = localStorage.getItem(CART_KEY);
    if (fetchedCart) {
      // this.cart$.next(JSON.parse(fetchedCart));
      return JSON.parse(fetchedCart);
    }
  }

  setCartToLocalStorage(cartItem: CartItem, updateQuantity?: boolean) {
    const fetchedCart = localStorage.getItem(CART_KEY);
    if (fetchedCart) {
      this.setItemToLocalStorageCart(fetchedCart, cartItem, updateQuantity);
    }
    else {
      this.initCartLocalStorage();
      const fetchedCart2 = localStorage.getItem(CART_KEY);
      if (fetchedCart2) {
        this.setItemToLocalStorageCart(fetchedCart2, cartItem, updateQuantity);
      }
    }
  }

  deleteItemFromCart(productId: string) {
    const fetchedCart = localStorage.getItem(CART_KEY);
    if (fetchedCart) {
      const cartJson = JSON.parse(fetchedCart).items;
      const filteredItems = cartJson.filter((item: CartItem) => item.productId !== productId);
      const cart = {
        items: filteredItems
      }
      // update data in localstorage
      localStorage.setItem(CART_KEY, JSON.stringify(cart));

      // update data in UI
      const fetchedCartAfterUpdate = localStorage.getItem(CART_KEY);
      if (fetchedCartAfterUpdate) {
        this.cart$.next(JSON.parse(fetchedCartAfterUpdate))
      }
    }
  }

  emptyCart() {
    const intialCart = {
      items: []
    };
    const intialCartJson = JSON.stringify(intialCart);
    localStorage.setItem(CART_KEY, intialCartJson);
    this.cart$.next(intialCart);
  }
}
