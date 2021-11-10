import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {LeaveService} from '../_services/leave.service'

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
    range = new FormGroup({
    startdate: new FormControl(),
    enddate: new FormControl(),

  });
  form: any = {};
  isSuccessful = false;
  isApplyleaveFailed = false;
  errorMessage = '';

  constructor(private leaveService: LeaveService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.leaveService.Applyleave(this.form).subscribe(
      data => {
        console.log(this.form);
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
