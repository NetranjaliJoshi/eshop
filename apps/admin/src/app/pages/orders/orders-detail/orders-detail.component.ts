import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@bluebits/orders';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import {ORDER_STSTUS} from '../order.contants';

import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit ,OnDestroy{
  order: Order;
  orderStatues=[];
  selectStatus :any;
  endsubs$: Subject<void> = new Subject();
  constructor(private orderService : OrdersService ,private messageService : MessageService ,private route : ActivatedRoute) { }

  ngOnInit(): void {
    this._mapOrderStatues();
    this._getOrder();
  }
  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _mapOrderStatues(){
   this.orderStatues = Object.keys(ORDER_STSTUS).map((key) =>{
      return{
        id:key,
        name:ORDER_STSTUS[key].label
      }
    })
  }
  private _getOrder(){
    this.route.params.subscribe((params)=>{
      if(params['id']){
        this.orderService.getOrder(params['id'])
        .pipe(takeUntil(this.endsubs$))
        .subscribe((order)=>{
          this.order = order;
          this.selectStatus = order.status;
          console.log(this.order)
        })
      }
    })
  }

  onStatusChange(event)
  {
    this.orderService.updateOrder({status : event.value},this.order.id)
    .pipe(takeUntil(this.endsubs$))
    .subscribe(() =>
    {
      this.messageService.add({
        severity:'success',
         summary:'success ', 
         detail:'Order is updated'
         })

    }),()=>{
      this.messageService.add({
        severity:'error',
       summary:'error ', 
       detail:'Order is not updated'});    
  }
  }

}
