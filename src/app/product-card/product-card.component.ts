import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  @Input('width') width = '20';

  constructor( private cartService: ShoppingCartService) { }

  addToCart(product: Product){
    return this.cartService.addToCart(this.product);
  }

  // getQuantity() {
  //   if (!this.shoppingCart) return 0;

  //   let item = this.shoppingCart.items[this.product.key];
  //   return item ? item.quantity : 0;
  // }

}
