import { AngularFireObject } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  query(query: any) {
    throw new Error("Method not implemented.");
  }
  unsubscribe: any;
  

  constructor(private db: AngularFireDatabase) { }

  create(product: JSON){
   return this.db.list('/product').push(product);
  }

  getAll() { return this.db.list('/product', ref => ref.orderByChild('name')).snapshotChanges().map(products => { return products.map(c => ({ key: c.payload.key, ...c.payload.val() })); }); }
 
  
  get(productId) {
    return this.db.object('/product/' + productId);
  }

  update(productId, product){
   return this.db.object('/product/'+ productId).update(product)
  }

  delete(productId){
    return this.db.object('/product/'+ productId).remove();
  }

}
