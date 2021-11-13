import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../_services/leave.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-updateleave',
  templateUrl: './updateleave.component.html',
  styleUrls: ['./updateleave.component.css']
})
export class UpdateleaveComponent implements OnInit {

 leaves: any=[];
 currentLeave = null;
 message = '';
 id : number;
 currentUser: any;
 username : string;

 constructor(
  private token: TokenStorageService,
   private leaveService: LeaveService,
   ) { }

 ngOnInit(): void {
   
   this.message = '';
   this.currentUser = this.token.getUser();
   this.id = this.currentUser.id;
   this.username = this.currentUser.username;
   this.retrieveleaves();
 }

 retrieveleaves(): void {
  console.log(this.currentUser)
  this.leaveService.getallleaves(this.username)
    .subscribe(
      data => {
        this.leaves = data;
        console.log(data);
        // for(var val of data){
        //   console.log(val);
        // }
      },
      error => {
        console.log(error);
      });
}

getusername(){
  return this.currentUser.username;
}

 
  
  updateStatus(status): void {
    const data = {
      username: this.leaves.username,
      email: this.leaves.email,
      mobile: this.leaves.mobile,
      leavetype: this.leaves.leavetype,
      startdate: this.leaves.startdate,
      enddate: this.leaves.endate,
      status:this.leaves.status,
      roles: this.leaves.roles
    };

    this.leaveService.editleave(this.leaves.id, data)
      .subscribe(
        response => {
          this.leaves.status = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateLeave(): void {
    this.leaveService.editleave(this.leaves.id, this.leaves)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The Leave was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

}
