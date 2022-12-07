import { Component, OnInit ,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@bluebits/products';
//import { UsersService } from '@bluebits/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles :[],
})
export class CategoriesListComponent implements OnInit , OnDestroy {

   categories : Category[] = [];
   endsubs$: Subject<void> = new Subject();
   
  constructor(private categoryService : CategoriesService,
    private messageService : MessageService,
    private confirmationService: ConfirmationService,
    private router : Router,
    /*private userService : UsersService*/) { }

  ngOnInit(): void 
  {
    this._getCategories();
  }

  ngOnDestroy() : void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  deleteCategory(categoryId : string){
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Category',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoryService.deleteCategory(categoryId)
        .pipe(takeUntil(this.endsubs$))
        .subscribe(
          () =>{
            this._getCategories();
          this.messageService.add({
            severity:'success',
             summary:'success ', 
             detail:'Category is deleted'});
             
        },
        ()=>{
          this.messageService.add({severity:'error', summary:'error ', detail:'Category is not deleted'});    
        }); 
      },
      
  });
  }

  updateCategory(categoryid : string)
  {
    this.router.navigateByUrl(`categories/form/${categoryid}`)
  }
  private _getCategories(){
    this.categoryService.getCategories()
    .pipe(takeUntil(this.endsubs$))
    .subscribe((cats)=>{
      this.categories = cats;
    })
  }
}

