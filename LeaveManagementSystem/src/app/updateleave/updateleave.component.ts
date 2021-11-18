import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LeaveService } from '../_services/leave.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Location } from "@angular/common";

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
  isUpdateleaveFailed = false;
  errorMessage = '';

  leaves: any = [];
  currentLeave = null;
  message = '';
  id: number;
  currentUser: any;
  username: string;
  //  authority : {id:number};

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
    
    //  this.authority = this.location.getState();
    this.id = history.state.id;
    this.retrieveleaves();
    // console.log(this.id,history.state);
  }

  onSubmit(): void {
    
    
      this.leaveService.editleave(this.id, this.form, this.range, this.leaves.roles)
        .subscribe(
          response => {
            console.log(this.id, this.form, this.range, this.leaves.roles);
            console.log(response);
            this.message = 'The Leave was updated successfully!';
            this.isSuccessful = true;
                this.isUpdateleaveFailed = false;
              },
              err => {
                this.errorMessage = err.error.message;
                this.isUpdateleaveFailed = true;
              }
            );
    
  }

  retrieveleaves(): void {
    this.leaveService.getleave(this.id)
      .subscribe(
        data => {
          this.leaves = data;
          console.log(this.id);
          console.log(data);
          
        },
        error => {
          console.log(error);
        });
  }

  getusername() {
    return this.currentUser.username;
  }



  updateStatus(status): void {
    const data = {
      username: this.leaves.username,
      leavetype: this.leaves.leavetype,
      startdate: this.leaves.startdate,
      enddate: this.leaves.endate,
      status: this.leaves.status,
      roles: this.leaves.roles
    };

  }

  updateLeave(): void {
    this.leaveService.editleave(this.id, this.form, this.range, this.leaves.roles)
      .subscribe(
        response => {
          console.log(this.id, this.form, this.range, this.leaves.roles);
          console.log(response);
          this.message = 'The Leave was updated successfully!';
        },
        error => {
          // console.log(error);
        });
  }

}
