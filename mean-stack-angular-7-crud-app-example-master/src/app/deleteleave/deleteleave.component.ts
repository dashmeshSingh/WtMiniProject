import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveService } from '../_services/leave.service';

@Component({
  selector: 'app-deleteleave',
  templateUrl: './deleteleave.component.html',
  styleUrls: ['./deleteleave.component.css']
})
export class DeleteleaveComponent implements OnInit {
  leaves: any = [];
  id: number;
  form: any = {};
  isSuccessful = false;
  isDeleteleaveFailed = false;
  constructor(private leaveService:LeaveService,
    private router:Router) { }

  ngOnInit(): void {
    this.id = history.state.id;
    this.retrieveleaves();
  }
  retrieveleaves(): void {
    // console.log(this.currentUser)
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

  deleteLeave(): void {
    this.leaveService.deleteleave(this.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/viewleaves']);
        },
        error => {
          console.log(error);
        });
  }

}
