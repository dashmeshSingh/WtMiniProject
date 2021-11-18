import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { LeaveService } from '../_services/leave.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-adminviewleaves',
  templateUrl: './adminviewleaves.component.html',
  styleUrls: ['./adminviewleaves.component.css']
})
export class AdminviewleavesComponent implements OnInit {

  leaves: any;
  currentleave = null;
  currentIndex = -1;
  username : string;
  currentUser: any;
  currentToken: any;
  isSuccessful = false;
  isUpdateleaveFailed = false;
  errorMessage = '';
  message = '';



  constructor(
    private leaveservice: LeaveService,
    private tokenStorageService: TokenStorageService,
    private authservice: AuthService) { }
    

  ngOnInit(): void {
    this.currentToken= this.tokenStorageService.getToken();
    console.log(this.currentToken);
    
    this.currentUser = this.tokenStorageService.getUser();
    this.username = this.currentUser.username;
    this.retrieveAdminViewleaves();
  }
 
  updateStatus(status,leaveid): void {
    const data = {
      username: this.leaves.username,
      leavetype: this.leaves.leavetype,
      startdate: this.leaves.startdate,
      enddate: this.leaves.endate,
      status: status,
      roles: this.leaves.roles
    };

    this.authservice.editstatus(leaveid, data, this.leaves.roles)
        .subscribe(
          response => {
            this.message = 'The Leave was updated successfully!';
            console.log(response);
            
            this.isSuccessful = true;
                this.isUpdateleaveFailed = false;
              },
              err => {
                this.errorMessage = err.error.message;
                this.isUpdateleaveFailed = true;
              }
            );
    

  }



  retrieveAdminViewleaves(): void {
    this.authservice.getAdminViewleaves(this.currentToken)
      .subscribe(
        data => {
          this.leaves = data;
        
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
