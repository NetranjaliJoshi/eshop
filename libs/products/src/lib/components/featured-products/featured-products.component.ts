import { Component, OnInit ,OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit,OnDestroy {

  featuredproducts : Product[] =[];
  endSub$ : Subject<void> = new Subject();
  constructor(private productsService : ProductsService) { }

  ngOnInit(): void {
    this._getFeaturedProducts()
  }
  ngOnDestroy(): void {
      this.endSub$.next();
      this.endSub$.complete();
  }

  private  _getFeaturedProducts(){
    this.productsService.getFeaturedProduct(4).pipe(takeUntil(this.endSub$)).subscribe(products =>
      {this.featuredproducts = products}
      )
  }

}
