import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';


@Component({
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.css"]
})
export class BsNavbarComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
   
  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {}
  logout() {
    this.auth.logout();
  }
  async ngOnInit() {
    // this.auth.appUser$.subscribe(appuser => this.appUser = appuser);
    this.cart$ = await this.shoppingCartService.getCart();
  }
}
