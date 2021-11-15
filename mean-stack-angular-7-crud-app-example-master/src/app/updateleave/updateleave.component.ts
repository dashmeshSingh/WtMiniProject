import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LeaveService } from '../_services/leave.service';
import { TokenStorageService } from '../_services/token-storage.service';
import {Location} from "@angular/common";

@Component({
  selector: 'app-updateleave',
  templateUrl: './updateleave.component.html',
  styleUrls: ['./updateleave.component.css']
})
export class UpdateleaveComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),

  });
  form: any = {};
  isSuccessful = false;
  isApplyleaveFailed = false;
  errorMessage = '';
  
 leaves: any=[];
 currentLeave = null;
 message = '';
//  id : number;
 currentUser: any;
 username : string;
 authority : {id:number};

 constructor(
  private token: TokenStorageService,
   private leaveService: LeaveService,
   private location: Location,
   ) { }

 ngOnInit(): void {

   
   this.message = '';
   this.currentUser = this.token.getUser();
  //  this.id = this.currentUser.id;
   this.username = this.currentUser.username;
   this.retrieveleaves();
  //  this.authority = this.location.getState();
  console.log(history.state)
 }

 onSubmit(): void {
  this.leaveService.Applyleave(this.form,this.range).subscribe(
    data => {
      console.log(this.form);
      console.log(this.range);
      console.log(data);
      this.isSuccessful = true;
      this.isApplyleaveFailed = false;
    },
    err => {
      this.errorMessage = err.error.message;
      this.isApplyleaveFailed = true;
    }
  );
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
