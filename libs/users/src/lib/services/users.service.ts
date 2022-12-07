import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import * as countriesLib from 'i18n-iso-countries';
import { map } from 'rxjs/operators';
import { UsersFacade } from '../state/users.facade';
declare const require;
@Injectable({
  providedIn: 'root'
})

export class UsersService {


  apiURLUser= environment.apiURL + 'users';

  constructor( private http : HttpClient , private usersFacade : UsersFacade) { 
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
  }
  getUsers() : Observable<User[]>
  {
    return this.http.get<User[]>(this.apiURLUser);

  }

  getUser(userid : string) : Observable<User>
  {
    return this.http.get<User>(`${this.apiURLUser}/${userid}`);

  }
  createUsers(user : User) : Observable<User>{
    return this.http.post<User>(this.apiURLUser,user)
  }

  updateUsers(user : User) : Observable<User>{
    return this.http.put<User>(`${this.apiURLUser}/${user.id}`,user)
  }
  deleteUsers(userId : string) : Observable<object>{
    return this.http.delete<object>(`${this.apiURLUser}/${userId}`);
  }

  getCountry(countryKey : string):string{
    return countriesLib.getName(countryKey,'en');
  }

  getCountries(){
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    return Object.entries(countriesLib.getNames("en", {select: "official"})).map(entry =>{
      return {
        id : entry[0],
        name : entry[1]
      }
    })
  }  

  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLUser}/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }
  
  initAppSession(){
    this.usersFacade.buildUserSession();
    //console.log(this.usersFacade.buildUserSession()+"from user service")
  }

  observeCurrentUser(){
    return this.usersFacade.currentUser$;
  }

  isCurrentUserAuth(){
    return this.usersFacade.isAuthenticated$;
  }

}
