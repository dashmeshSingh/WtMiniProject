import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../_services/leave.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-viewleaves',
  templateUrl: './viewleaves.component.html',
  styleUrls: ['./viewleaves.component.css']
})
export class ViewleavesComponent implements OnInit {

  leaves: any;
  currentleave = null;
  currentIndex = -1;
  username : string;
  currentUser: any;



  constructor(
    private token: TokenStorageService,
    private leaveService: LeaveService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.username = this.currentUser.username;
    this.retrieveleaves();
  }

  retrieveleaves(): void {
    this.leaveService.getallleaves(this.username)
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
