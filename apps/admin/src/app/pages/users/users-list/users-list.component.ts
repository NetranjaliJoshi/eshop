import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@bluebits/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit ,OnDestroy {

  users : User[] = [];
  endsubs$: Subject<void> = new Subject();
  //categories : Category[] = [];
  constructor(
  
    private messageService : MessageService,
    private confirmationService: ConfirmationService,
    private router : Router,
    private userService : UsersService
  ) { }

  ngOnInit(): void {
    this._getUsers();
  }
  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  deleteUsers(userId : string){
    this.confirmationService.confirm({
      message: 'Do you want to Delete this User',
      header: 'Delete user',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUsers(userId)
        .pipe(takeUntil(this.endsubs$))
        .subscribe(
          () =>{
            this._getUsers();
          this.messageService.add({
            severity:'success',
             summary:'success ', 
             detail:'User is deleted'});
             
        },
        ()=>{
          this.messageService.add({severity:'error', summary:'error ', detail:'user is not deleted'});    
        }); 
      },
      
  });
  }

  updateUsers(userid : string)
  {
    this.router.navigateByUrl(`users/form/${userid}`)
  }

  getCountryName(countryKey : string) : string{
    if(countryKey) 
      return this.userService.getCountry(countryKey);
    else
    return '';  
    
  }
  private _getUsers(){
    this.userService.getUsers()
    .pipe(takeUntil(this.endsubs$))
    .subscribe((users)=>{
      this.users = users;
    })
  }

}
