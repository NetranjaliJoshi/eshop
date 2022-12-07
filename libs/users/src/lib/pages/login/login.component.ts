import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup , FormBuilder ,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginFormGroup : FormGroup;
  isSubmitted = false;
  authError = false;
  authMessgae = 'Email or Password is worng';
  constructor(private auth : AuthService,
    private formBuilder : FormBuilder,
     private localstorageService : LocalstorageService,
     private router : Router) { console.log()}

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm(){
    this.loginFormGroup = this.formBuilder.group({
      email : ['',[Validators.required ,Validators.email]],
      password :['',Validators.required]
    });
  }

  onSubmit()
  {
    this.isSubmitted = true;

    if(this.loginFormGroup.invalid) return;
    this.auth.login(this.loginForm['email'].value ,
    this.loginForm['password'].value).subscribe((user)=>{
      
      this.authError = false
      this.localstorageService.setToken(user.token);
      this.router.navigate(['/']);
    },
    (error : HttpErrorResponse)=>{
      this.authError=true;
      if( error.status !== 400)
      {
          this.authMessgae = " Error in the server , please try angin later"
      }
    }
    );
  }
  get loginForm(){
    return this.loginFormGroup.controls;
  }
  

}
