import { Component, OnInit } from '@angular/core';
import {ViewleavesService} from '../_services/viewleaves.service';

@Component({
  selector: 'app-viewleaves',
  templateUrl: './viewleaves.component.html',
  styleUrls: ['./viewleaves.component.css']
})
export class ViewleavesComponent implements OnInit {

  leaves: any;
  currentleave = null;
  currentIndex = -1;
  username = 'suppu';

  constructor(private leaveService: ViewleavesService) { }

  ngOnInit(): void {
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
