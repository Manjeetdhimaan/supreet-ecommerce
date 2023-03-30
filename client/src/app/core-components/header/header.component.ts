import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/shared/models/cart.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { ContactDetailsService } from 'src/app/shared/services/contact-details.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartQuantity: number = 0;
  cartSubs$: Subscription;
  isSticky: boolean = false;
  phones: string[];
  emails: string[];
  socialMediaLinks: any;

  // @HostListener('window:scroll', ['$event'])
  // checkScroll() {
  //   this.isSticky = window.pageYOffset >= 250;
  // }

  constructor( private cartService: CartService, private contactDetailsService: ContactDetailsService ) {}

  ngOnInit(): void {
    this.contactDetailsService.getContactDetails().subscribe((res: any) => {
      this.phones = res['details'][0]['phone'];
      this.emails = res['details'][0]['email'];
      this.socialMediaLinks = res['details'][0]['socialMediaLinks'];
    })
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
