import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@bluebits/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: [
  ]
})
export class UsersFormComponent implements OnInit {

  form: FormGroup;
    isSubmitted  = false;
    editmode = false;
    currentuserID : string;
    countries = [];
  constructor(
      private formBulider : FormBuilder ,
        private userService : UsersService 
        ,private messageService: MessageService ,
        private location : Location,
        private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
      this._initUsers()
      this._checkEditMode();
      this._getCountries();
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
        return;
    }
    const user : User ={
        id : this.currentuserID,
        name : this.userForm['name'].value,
        password : this.userForm['password'].value,
        email    : this.userForm['email'].value,
        phone    : this.userForm['phone'].value,
        isAdmin  : this.userForm['isAdmin'].value,
        street   : this.userForm['street'].value,
        apartment: this.userForm['apartment'].value,
        zip      : this.userForm['zip'].value,
        country  : this.userForm['country'].value,
         }    
    if(this.editmode)
    {
        this._upadateUser(user);
    }
    else
    {
        this._addUser(user);
    }
    
}

private _addUser(user : User)
{
    this.userService.createUsers(user).subscribe((user : User) =>{
        this.messageService.add({
            severity:'success',
             summary:'success ', 
             detail:`Category ${user.name}is created`});
             timer(2000).toPromise().then(() =>{
                this.location.back();
             })

    },
    ()=>{
        this.messageService.add({severity:'error', summary:'error ', detail:'Category is not created'});    
    }
    );
}

private _upadateUser(user : User)
{
    this.userService.updateUsers(user).subscribe(() =>{
        this.messageService.add({
            severity:'success',
             summary:'success ', 
             detail:'User is updated'});
             timer(2000).toPromise().then(() =>{
                this.location.back();
             })

    },
    ()=>{
        this.messageService.add({severity:'error', summary:'error ', detail:'User is not updated'});    
    }
    ); 
}

private _getCountries(){
  
  this.countries = this.userService.getCountries()

}

private _checkEditMode(){
   this.route.params.subscribe(params =>{
        if(params['id']){
            this.editmode = true;
            this.currentuserID = params['id'];
            this.userService.getUser(params['id']).subscribe((user)=>{
                this.userForm['name'].setValue(user.name);
                this.userForm['password'].setValue(user.password);
                this.userForm['email'].setValue(user.email);
                this.userForm['phone'].setValue(user.phone);
                this.userForm['isAdmin'].setValue(user.isAdmin);
                this.userForm['street'].setValue(user.street);
                this.userForm['apartment'].setValue(user.apartment);
                this.userForm['zip'].setValue(user.zip);
                this.userForm['country'].setValue(user.country);
                
                this.userForm['password'].setValidators([]);
                this.userForm['password'].updateValueAndValidity();
            })
        }
   }) 
}
private _initUsers(){
  this.form = this.formBulider.group({
    name :['',Validators.required],
    password :['',Validators.required],
  email : ['',[Validators.required,Validators.email]],
  phone : ['',Validators.required], 
  isAdmin : [false],
  street : [''],
  apartment : [''],
  zip : [''],
  city :[''],
  country : [''],
    
});
}
onCancle() {
  this.location.back();
}

get userForm(){
    return this.form.controls
}


}
