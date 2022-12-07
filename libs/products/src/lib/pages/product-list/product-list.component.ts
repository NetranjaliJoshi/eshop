import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './product-list.component.html',
  styles: [
  ]
})
export class ProductListComponent implements OnInit {

  products : Product[] = [];
  categories : Category[] =[];
  isCategoryPage = false;
  
  constructor(private productsService : ProductsService ,private categoriesService : CategoriesService,
    private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      params['categoryid'] ? this._getProducts([params['categoryid']] ) : this._getProducts();
      params['categoryid'] ? this.isCategoryPage = true :this.isCategoryPage = false;
    })
    
    this._getCategorys();
  }

  private _getProducts(categorriesFilter ?: string[] ){
    this.productsService.getProducts(categorriesFilter).subscribe(resproducts =>{
      this.products = resproducts;
    })
  }

  private _getCategorys()
  {
    this.categoriesService.getCategories().subscribe(rescatory =>{
      this.categories = rescatory;
    })
  }

  categoryFilter(){
  
    const selectedCatagorires= this.categories.filter(category =>category.checked)
    .map((catrgory)=>catrgory.id);
    this._getProducts(selectedCatagorires)
  
  }


}
