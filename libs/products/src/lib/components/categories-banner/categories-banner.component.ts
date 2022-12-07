import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [
  ]
})
export class CategoriesBannerComponent implements OnInit ,OnDestroy {

  categories : Category[] = [];
  endSub$ : Subject<void> = new Subject();
  constructor(private categoriesService : CategoriesService) { 
    
  }

  ngOnInit(): void {
    this.categoriesService.getCategories()
    .pipe(takeUntil(this.endSub$))
    .subscribe(categories =>{
      
      this.categories = categories;
    })
  }

  ngOnDestroy(): void {
      this.endSub$.next();
      this.endSub$.complete()
  }

}
