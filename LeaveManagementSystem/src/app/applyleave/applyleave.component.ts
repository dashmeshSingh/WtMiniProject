import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {LeaveService} from '../_services/leave.service'
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-applyleave',
  templateUrl: './applyleave.component.html',
  styleUrls: ['./applyleave.component.css']
})
export class ApplyleaveComponent implements OnInit {
    range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),

  });
  form: any = {};
  isSuccessful = false;
  isApplyleaveFailed = false;
  errorMessage = '';
  currentUser: any;
  username: string;
  constructor(private leaveService: LeaveService,
    private token: TokenStorageService,
    ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    //  this.id = this.currentUser.id;
    this.username = this.currentUser.username;
    console.log(this.currentUser)
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


}
