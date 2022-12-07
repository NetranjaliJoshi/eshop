import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CategoriesService, ProductsService } from '@bluebits/products';
//import { UsersService } from '@bluebits/users';

import { ShellComponent } from './shared/shell/shell.component';
import { SlidebarComponent } from './shared/slidebar/slidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';

import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { AuthGuardService, JwtInterceptor, UsersModule, UsersService } from '@bluebits/users';

import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import {InputNumberModule} from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {EditorModule} from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import {InputMaskModule} from 'primeng/inputmask';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import {FieldsetModule} from 'primeng/fieldset';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxStripeModule } from 'ngx-stripe';





const UX_MODULE = [CardModule, 
    ToastModule, 
    InputTextModule, 
    TableModule, 
    ToolbarModule, 
    ButtonModule
    , ConfirmDialogModule, 
    ColorPickerModule,
    InputNumberModule,
    DropdownModule,
    InputTextareaModule,
    InputSwitchModule,
    EditorModule,
    TagModule,
    InputMaskModule,
    FieldsetModule
    ];

const routes: Routes = [
    {
        path: '',
        component: ShellComponent,
        canActivate :[AuthGuardService],
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'categories',
                component: CategoriesListComponent
            },
            {
                path: 'categories/form',
                component: CategoriesFormComponent
            },
            {
                path: 'categories/form/:id',
                component: CategoriesFormComponent
            },
            {
                path: 'products',
                component: ProductsListComponent
            },
            {
                path: 'products/form',
                component: ProductsFormComponent
            },
            {
                path: 'products/form/:id',
                component: ProductsFormComponent
            },
            {
                path: 'users',
                component:UsersListComponent
            },
            {
                path: 'users/form',
                component: UsersFormComponent
            },
            {
                path: 'users/form/:id',
                component: UsersFormComponent
            },
            {
                path: 'orders',
                component:OrdersListComponent
            },
            {
                path: 'orders/:id',
                component:OrdersDetailComponent
            },

        ]
    },
    {
        path : '**',
        redirectTo :'',
        pathMatch : 'full'
    }
];
@NgModule({
    declarations: [
        AppComponent,
        NxWelcomeComponent,
        ShellComponent,
        SlidebarComponent,
        DashboardComponent,
        CategoriesListComponent,
        CategoriesFormComponent,
        ProductsListComponent,
        ProductsFormComponent,
        UsersListComponent,
        UsersFormComponent,
        OrdersListComponent,
        OrdersDetailComponent,
        
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
        ...UX_MODULE,
        FormsModule,
        ReactiveFormsModule,
        UsersModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        NgxStripeModule.forRoot('pk_test_51M2x4WSGvoaanwFehE07tufdWIaszo6lXSOTIhpkeGYcPwKbmI5d4q37vyZD0WtUin1K6PDD7RIEUb01jJlRDGBe00IwqNBTXW')
    ],
    providers: [CategoriesService, MessageService, ConfirmationService ,ProductsService,UsersService,
    {provide: HTTP_INTERCEPTORS , useClass: JwtInterceptor ,multi: true}],

    bootstrap: [AppComponent]
})
export class AppModule {}
