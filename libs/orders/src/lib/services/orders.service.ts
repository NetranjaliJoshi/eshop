import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import {environment} from '@env/environment';
import { OrderItem } from '../models/order-item';
import { StripeService } from 'ngx-stripe';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
   apiURLOrderes= environment.apiURL + 'orders';
   apiURLProducts = environment.apiURL + 'products';


  constructor( private http : HttpClient,
               private stripeService : StripeService
    ) {}
  getOrders() : Observable<Order[]>
  {
    return this.http.get<Order[]>(this.apiURLOrderes);

  }

  getOrder(orderid : string) : Observable<Order>
  {
    return this.http.get<Order>(`${this.apiURLOrderes}/${orderid}`);

  }
  createOrder(order : Order) : Observable<Order>{
    return this.http.post<Order>(this.apiURLOrderes,order)
  }

  updateOrder(orderStatus :{status : string},orderId : string) : Observable<Order>{
    return this.http.put<Order>(`${this.apiURLOrderes}/${orderId}`,orderStatus)
  }

  deleteOrder(orderId : string) : Observable<object>{
    return this.http.delete<object>(`${this.apiURLOrderes}/${orderId}`);
  }

  getOrderCount() : Observable<number>{
    return this.http
          .get<number>(`${this.apiURLOrderes}/get/count`)
          .pipe(map((objectValue : any)=>objectValue.orderCount));
  }

  getTotalsales() : Observable<number>{
    return this.http
            .get<number>(`${this.apiURLOrderes}/get/totalsales`)
            .pipe(map((objectValue : any)=> objectValue.totalsales))
  }
  
  getProduct(productId : string) : Observable<any>{
    return this.http.get<any>(`${this.apiURLProducts}/${productId}`)
 }

 createCheckoutSession(orderItems : OrderItem[]){
  return this.http.post(`${this.apiURLOrderes}/create-checkout-session`,orderItems)
  .pipe(switchMap((session:{ id : string}) =>{
    return this.stripeService.redirectToCheckout({sessionId: session.id})
  }))
 }

 cacheOrderData(order : Order)
 {
    localStorage.setItem('orderData',JSON.stringify(order));
 }

 getCachedOrderData():Order
 {
   return JSON.parse(localStorage.getItem('orderData'));
 }

 removeCachedOrderdata(){
  localStorage.removeItem('orderData');
 }


}
