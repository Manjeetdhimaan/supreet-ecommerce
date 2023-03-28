import { Product } from "./product.model";

export class Cart {
  constructor( public items: CartItem[] ) {}
}

export class CartItem {
  constructor( public productId: string, public quantity: number, public size?: string, public color?: string, public _id?: string ) {}
}

export class CartProduct {
  constructor( public product: Product, public quantity: number, public size?: string, public color?: string, public productId?: string ) {}
}
