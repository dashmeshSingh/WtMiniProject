import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  content: string;
  currentToken: any;
  currentUser: any;
  username: string;
  constructor(private userService: UserService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.currentToken= this.tokenStorageService.getToken();
    console.log(this.currentToken);
  
    this.currentUser = this.tokenStorageService.getUser();
    this.username = this.currentUser.username;
    console.log(this.currentUser);
    const params = new HttpParams()
   .set('username', this.username)
  

    // const header =  { headers: {'x-access-token': this.currentToken} };
    this.userService.getAdminBoard(this.currentToken,this.username).subscribe(
      data => {
        this.content = data;
        console.log(data);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
