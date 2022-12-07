import { Location } from '@angular/common';
import { Component, OnInit ,OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html',
    styles: []
})
export class CategoriesFormComponent implements OnInit,OnDestroy {

    form: FormGroup;
    isSubmitted  = false;
    editmode = false;
    currentCategoryID : string;
    endsubs$: Subject<void> = new Subject();
    constructor(private formBulider : FormBuilder ,
        private categoryService : CategoriesService 
        ,private messageService: MessageService ,
        private location : Location,
        private route : ActivatedRoute) {}

    ngOnInit(): void {
        this.form = this.formBulider.group({
            name :['',Validators.required],
            icon :['',Validators.required],
            color :['#fff']
        });
        this._checkEditMode();
    }
    ngOnDestroy() {
        this.endsubs$.next();
        this.endsubs$.complete();
      }
    onSubmit(){
        this.isSubmitted = true;
        if(this.form.invalid){
            return;
        }
        const category : Category ={
            id : this.currentCategoryID,
            name : this.categoryForm['name'].value,
            icon :this.categoryForm['icon'].value,
            color :this.categoryForm['color'].value
        }    
        if(this.editmode)
        {
            this._upadateCategory(category);
        }
        else
        {
            this._addCategory(category);
        }
        
    }

    private _addCategory(category : Category)
    {
        this.categoryService.createCategory(category)
        .pipe(takeUntil(this.endsubs$))
        .subscribe((category : Category) =>{
            this.messageService.add({
                severity:'success',
                 summary:'success ', 
                 detail:`Category ${category.name}is created`});
                 timer(2000).toPromise().then(() =>{
                    this.location.back();
                 })
  
        },
        ()=>{
            this.messageService.add({severity:'error', summary:'error ', detail:'Category is not created'});    
        }
        );
    }

    private _upadateCategory(category : Category)
    {
        this.categoryService.updateCategory(category)
        .pipe(takeUntil(this.endsubs$))
        .subscribe(() =>{
            this.messageService.add({
                severity:'success',
                 summary:'success ', 
                 detail:'Category is updated'});
                 timer(2000).toPromise().then(() =>{
                    this.location.back();
                 })
  
        },
        ()=>{
            this.messageService.add({severity:'error', summary:'error ', detail:'Category is not updated'});    
        }
        ); 
    }

    private _checkEditMode(){
       this.route.params
       .pipe(takeUntil(this.endsubs$))
       .subscribe(params =>{
            if(params['id']){
                this.editmode = true;
                this.currentCategoryID = params['id'];
                this.categoryService.getCategory(params['id'])
                .pipe(takeUntil(this.endsubs$))
                .subscribe((category)=>{
                    this.categoryForm['name'].setValue(category.name);
                    this.categoryForm['icon'].setValue(category.icon);
                    this.categoryForm['color'].setValue(category.color);

                })
            }
       }) 
    }

    get categoryForm(){
        return this.form.controls
    }
}
