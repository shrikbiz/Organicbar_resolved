import { Observable } from 'rxjs/Observable';
// import { ShoppingCart } from '../models/shopping-cart';
// import { IProduct } from '../models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor( private db:AngularFireDatabase) { }
  
    async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
      .map(x => new ShoppingCart(x['items']));
    }

    async addToCart(product: Product) {
      this.updateItem(product, 1);
    }

    async removeFromCart(product: Product) {
      this.updateItem(product, -1);
    }

    async clearCart(){
      let cartId = await this.getOrCreateCartId();
      return this.db.object('/shopping-carts/' + cartId).remove()
    
    }

      

    private create() {
      return this.db.list('/shopping-carts/').push({
        dateCreated: new Date().getTime(),
        
      })
    }

    private getItem(cartId: string, productId: string) {
      return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
    }

    private async getOrCreateCartId(): Promise<string> {
      let cartId = localStorage.getItem('cartId');  
      if (cartId) {return cartId;
      }else{
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;}
    }



  // private async updateItem(product: Product, change: number) {
  //   let cartId = await this.getOrCreateCartId();
  //   let item$ = this.getItem(cartId, product.key);
  //   item$.valueChanges().take(1).subscribe(item => {
  //     let productQuantity = (product.quantity || 0) + change;
  //     let itemQuantity;
  //     if (item) {
  //       itemQuantity = item['quantity'];
  //       if (item['quantity'] === 0 || productQuantity === 0) {
  //         localStorage.clear();
  //         return item$.remove();
  //       }
  //       item$.update({
  //         title: product.title,
  //         imageUrl: product.imageUrl,
  //         price: product.price,
  //         quantity: itemQuantity + change
  //       });
  //     } else {
  //       itemQuantity = productQuantity;
  //       if (productQuantity === 0 || itemQuantity === 0) {
  //         localStorage.clear();
  //         return item$.remove();
  //       }
  //       item$.update({
  //         title: product.title,
  //         imageUrl: product.imageUrl,
  //         price: product.price,
  //         quantity: productQuantity
  //       });
  //     }
  //   })
  // }
    private async updateItem(product: Product, change: number) {
      let cartId = await this.getOrCreateCartId();
      let item = this.getItem(cartId, product.key);

      item.snapshotChanges().take(1)
        .subscribe(data => {
          let quantity = (data.payload.child('/quantity').val() || 0) + change;
          item.update({
              title: product.title,
              imageUrl:product.imageUrl,
              price: product.price,
              quantity: quantity
            });
          }
        );
    }
    
}
