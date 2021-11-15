import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {LeaveService} from '../_services/leave.service'

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

  constructor(private leaveService: LeaveService) { }

  ngOnInit(): void {
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
