import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '@env/environment';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
   apiURLProducts= environment.apiURL + 'products';

  constructor( private http : HttpClient) { 
    
  }
  getProducts(categorriesFilter ?:string[]) : Observable<Product[]>
  {
    let params = new HttpParams();
    if(categorriesFilter){
      params = params.append('categories',categorriesFilter.join(','))
     
    }
    return this.http.get<Product[]>(this.apiURLProducts,{ params:params });

  }

   createProducts(productData : FormData) : Observable<Product>
   {
     return this.http.post<Product>(this.apiURLProducts,productData);
   }
  getProduct(productId : string) : Observable<Product>{
     return this.http.get<Product>(`${this.apiURLProducts}/${productId}`)
  }

  updateProducts(productdata : FormData ,productId : string) : Observable<Product>{
     return this.http.put<Product>(`${this.apiURLProducts}/${productId}`,productdata)
   }
   
   deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLProducts}/${productId}`);
  }

  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLProducts}/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }

  getFeaturedProduct(count : number) : Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiURLProducts}/get/featured/${count}`)
  }
  
}