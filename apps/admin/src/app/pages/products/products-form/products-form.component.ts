import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Product, ProductsService } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { Subject, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html',
    styles: []
})
export class ProductsFormComponent implements OnInit ,OnDestroy{
    editmode = false;
    form : FormGroup;
    isSubmitted  = false;
    catagories = [];
    imagedisplay : string | ArrayBuffer;
    currentProductId : string;
    endsubs$: Subject<void> = new Subject();
    
    constructor(private formBuilder : FormBuilder,
        private categoriesService : CategoriesService,
        private productService : ProductsService,
        private messageService : MessageService,
        private location : Location,
        private route : ActivatedRoute
        ) {}

    ngOnInit(): void {
        this._initForm();
        this._getCategorie();
        this._checkEditMode();
    }

    ngOnDestroy() {
        this.endsubs$.next();
        this.endsubs$.complete();
      }

    private _initForm(){
        this.form = this.formBuilder.group({
            name : ['',Validators.required],
            brand : ['',Validators.required],
            price : ['',Validators.required],
            category : ['',Validators.required],
            countInStock : ['',Validators.required],
            description : ['',Validators.required],
            richDescription : [''],
            image : ['',Validators.required],
            isFeatured : [false],
        
        })

    }

    get productForm(){
        return this.form.controls;
    }
    onSubmit()
    {
        this.isSubmitted = true;
        if(this.form.invalid) return;

        const productFormData = new FormData();
        
        Object.keys(this.productForm).map((key)=>{
            console.log("key value",key);
            console.log("value",this.productForm[key].value)
            productFormData.append(key,this.productForm[key].value)
        });

        if(this.editmode)
        {
            this._updateProduct(productFormData);
        }else{
            this._addProduct(productFormData);
        }
        
    }
    onCancle(){console.log()}
    onImageUpload(event)
    {
        const file = event.target.files[0];
        if(file)
        {
            this.form.patchValue({image : file});
            this.form.get('image').updateValueAndValidity();
            const fileReader = new FileReader();
            fileReader.onload = () =>{
                this.imagedisplay = fileReader.result
            }
            fileReader.readAsDataURL(file);

        }
        
    }


    private _getCategorie(){
        this.categoriesService.getCategories()
        .pipe(takeUntil(this.endsubs$))
        .subscribe(catagories =>{
            this.catagories = catagories;
        })
    }

    private _checkEditMode(){
        this.route.params
        .pipe(takeUntil(this.endsubs$))
        .subscribe( (params) =>{
            if(params['id'])
            {
                this.editmode = true;
                this.currentProductId = params['id'];

                this.productService.getProduct(params['id']).subscribe((product)=>{
                    this.productForm['name'].setValue(product.name);
                    this.productForm['category'].setValue(product.category.id);
                    this.productForm['brand'].setValue(product.brand);
                    this.productForm['price'].setValue(product.price);
                    this.productForm['countInStock'].setValue(product.countInStock);
                    this.productForm['isFeatured'].setValue(product.isFeatured);
                    this.productForm['description'].setValue(product.description);
                    this.productForm['richDescription'].setValue(product.richDescription);
                    this.imagedisplay = product.image;
                    this.productForm['image'].setValidators([]);
                    this.productForm['image'].updateValueAndValidity();

                })
            }
        })
    }


    private _addProduct(productData : FormData)
    {
        this.productService.createProducts(productData)
        .pipe(takeUntil(this.endsubs$))
        .subscribe(
            (product : Product ) =>{
            this.messageService.add({
                severity:'success',
                 summary:'success ', 
                 detail:`Product ${product.name}is created`});
                 timer(2000)
                 .toPromise()
                 .then(() =>{
                    this.location.back();
                 })
  
        },
        ()=>{
            this.messageService.add({severity:'error', summary:'error ', detail:'Product is not created'});    
        }
        );
    }

    private _updateProduct(productFormData : FormData){
        this.productService.updateProducts(productFormData,this.currentProductId)
        .pipe(takeUntil(this.endsubs$))
        .subscribe(
        ()=>
        {
            this.messageService.add({
                severity:'success',
                 summary:'success ', 
                 detail:'Product is updated'});
                 timer(2000).toPromise().then(() =>{
                    this.location.back();
                 })
  
        },
        ()=>{
            this.messageService.add({severity:'error', summary:'error ', detail:'Product is not updated'});    
        }
        );  
        

    }

    
      
}
