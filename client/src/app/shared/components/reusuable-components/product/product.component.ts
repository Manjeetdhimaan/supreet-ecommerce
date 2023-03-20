import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product: Product;
  ratings: number = 5;

  constructor( private cartService: CartService ) {}

  numSequence(num: number): Array<number> {
    return Array(num);
  }

  onAddtoCart(productId: string) {
    const cartItem = {
      productId: productId,
      quantity: 1
    }
    this.cartService.setCartToLocalStorage(cartItem);
  }

  scrollTop() {
    window.scrollTo({
      top: 0
    })
  }
}
