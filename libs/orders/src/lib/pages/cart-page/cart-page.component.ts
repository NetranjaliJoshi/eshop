import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {  CartItemDetails } from '../../models/cart';

import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit ,OnDestroy {

  cartItemDetails : CartItemDetails[] = [];
  endSubs$ : Subject<void> = new Subject();
  cartCount = 0;
  constructor(private router : Router ,private cartService : CartService , private ordersService : OrdersService
    ) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  ngOnDestroy(): void {
      this.endSubs$.next();
      this.endSubs$.complete();
  }

  private _getCartDetails()
  {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe( (respCart) => {
      this.cartItemDetails = [];
      this.cartCount = respCart?.items.length ?? 0;
      respCart.items.forEach((cartItem) => {
        this.ordersService.getProduct(cartItem.productId).subscribe((resproducts) =>{
          this.cartItemDetails.push({
            product : resproducts,
            quantity : cartItem.quantity,
          })
        })
      });
    })
      
  }  
  

  backToShop(){
    this.router.navigate(['/products'])
  }

  deleteCartIteam(cartItem : CartItemDetails)
  {
    this.cartService.deleteCartItem(cartItem.product.id);
  }

  
  updateCartItemQuantity(event,cartItem : CartItemDetails){
    this.cartService.setCartIteam({
      productId : cartItem.product.id,
      quantity : event.value
    },
    true)
  }
 
  }


