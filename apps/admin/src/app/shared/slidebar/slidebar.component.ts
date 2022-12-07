import { Component, OnInit } from '@angular/core';
import { AuthService } from '@bluebits/users';


@Component({
    selector: 'admin-slidebar',
    templateUrl: './slidebar.component.html',
    
})
export class SlidebarComponent implements OnInit {
    constructor(private authService :AuthService ) {}

    ngOnInit(): void {console.log()}

    logoutUser(){
        this.authService.logout();
    }
}
