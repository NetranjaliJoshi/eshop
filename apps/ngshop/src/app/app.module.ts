import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import {AccordionModule} from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
//import { ProductsSearchComponent } from 'libs/products/src/lib/components/products-search/products-search.component';
import { UiModule } from '@bluebits/ui';
import { ProductsModule } from '@bluebits/products';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrdersModule } from '@bluebits/orders';
import { MessageComponent } from './shared/message/message.component';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { JwtInterceptor, UsersModule } from '@bluebits/users';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxStripeModule } from 'ngx-stripe';


const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    
];
@NgModule({
    declarations: [AppComponent, NxWelcomeComponent, HomePageComponent,
         HeaderComponent, FooterComponent, 
        NavComponent, MessageComponent],
    imports: [BrowserModule,
        BrowserAnimationsModule, 
        RouterModule.forRoot(routes),
        HttpClientModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        AccordionModule,
        UiModule,
        ProductsModule,
        OrdersModule,
        ToastModule,
        UsersModule,
        NgxStripeModule.forRoot('pk_test_51M2x4WSGvoaanwFehE07tufdWIaszo6lXSOTIhpkeGYcPwKbmI5d4q37vyZD0WtUin1K6PDD7RIEUb01jJlRDGBe00IwqNBTXW')
    ],
    providers: [MessageService,
    {provide: HTTP_INTERCEPTORS , useClass: JwtInterceptor ,multi: true}],
    
    bootstrap: [AppComponent]
})
export class AppModule {}
