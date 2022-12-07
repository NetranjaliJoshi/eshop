import { Component, OnInit ,OnDestroy} from '@angular/core';
import { OrdersService } from '@bluebits/orders';
import { ProductsService } from '@bluebits/products';
import { UsersService } from '@bluebits/users';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',

})
export class DashboardComponent implements OnInit ,OnDestroy {

  statistics = [];
  endsubs$: Subject<void> = new Subject();
  constructor(
    private usersService : UsersService,
    private productsService : ProductsService,
    private ordersService : OrdersService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrderCount(),
      this.productsService.getProductsCount(),
      this.usersService.getUsersCount(),
      this.ordersService.getTotalsales()
    ])
    .pipe(takeUntil(this.endsubs$))
    .subscribe((values) => {
      this.statistics = values;
    })
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

}
