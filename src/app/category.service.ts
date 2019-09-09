import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(){ return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges().map(categories => { return categories.map(c => ({ key: c.payload.key, ...c.payload.val() })); }); }
}
