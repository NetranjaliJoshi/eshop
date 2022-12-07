import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURLUser= environment.apiURL + 'users';
  constructor(private httpClient : HttpClient ,
    private token : LocalstorageService,
    private router : Router){}

  login(email : string,password : string) : Observable<User>{
    return this.httpClient.post<User>(`${this.apiURLUser}/login `,{email : email ,password : password})
  }

  logout()
  {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }
}
