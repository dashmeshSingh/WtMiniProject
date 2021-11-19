import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  currentleave: any;
  currentIndex = -1;
  username: string;
  currentUser: any;
  currentToken: any;
  isSuccessful = false;
  isUpdateleaveFailed = false;
  errorMessage = '';
  message = '';



  constructor(
    private leaveService: LeaveService,
    private tokenStorageService: TokenStorageService,
    private authservice: AuthService,
    private router: Router) { }


  ngOnInit(): void {
    this.currentToken = this.tokenStorageService.getToken();
    console.log(this.currentToken);

    this.currentUser = this.tokenStorageService.getUser();
    this.username = this.currentUser.username;
    this.retrieveAdminViewleaves();

  }
  retrieveleaves(id, status): void {
    this.leaveService.getleave(id)
      .subscribe(
        data => {
          this.updateStatus(status, data, id);
          console.log(data);

        },
        error => {
          console.log(error);
        });
  }

  updateStatus(status, leaves, leaveid): void {

    console.log(leaves)
    const data = {
      username: leaves.username,
      leavetype: leaves.leavetype,
      startdate: leaves.startdate,
      enddate: leaves.enddate,
      status: status,
      roles: leaves.roles
    };

    this.authservice.editstatus(leaveid, data, leaves.roles).subscribe(

      response => {

        this.message = 'The Leave was updated successfully!';
        console.log(response);
        
        this.isSuccessful = true;
        this.isUpdateleaveFailed = false;
        window.location.reload();
        // this.router.navigate(['/viewusers']);
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
