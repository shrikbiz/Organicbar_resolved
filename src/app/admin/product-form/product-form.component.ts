import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import 'rxjs-compat/add/operator/take';



@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  
  categories$;
  product:{}={title:'', price:'', imageUrl:'',category:''};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService:ProductService) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).valueChanges().subscribe(p => this.product = p);
  }
  save(product: JSON){
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  delete(){
  if (!confirm('Sure you want to delete?')) return; 
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }


  ngOnInit() {
  }

}
