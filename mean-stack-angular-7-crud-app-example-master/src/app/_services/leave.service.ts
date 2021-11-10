import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8080/api/test/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http: HttpClient) { }

  Applyleave(leave): Observable<any> {
    return this.http.post(AUTH_API + 'leave', {
      username: leave.username,
      email: leave.email,
      mobile: leave.mobile,
      startdate: leave.startdate,
      enddate: leave.enddate,
    }, httpOptions);
  }
}