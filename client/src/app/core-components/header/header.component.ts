import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/shared/models/cart.model';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartQuantity: number = 0;
  cartSubs$: Subscription;

  constructor( private cartService: CartService ) {}

  ngOnInit(): void {
    // this.cartService.cart$.next({totalPrice: 0, quantity: this.productService.products.length});
    this.cartSubs$ = this.cartService.cart$.subscribe(cart => {
      this.cartQuantity = 0;
          if (cart) {
            cart.items.map((item: CartItem) => {
              this.cartQuantity += item.quantity;
            });
          }
    })
  }

  scrollTop() {
    window.scrollTo({
      top: 0
    })
  }
}
