import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';
const LEAVE_API = 'http://localhost:8080/api/test/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getAdminViewleaves(token): Observable<any> {
    return this.http.get(AUTH_API + 'adminviewleaves', { responseType: 'json', headers: {'x-access-token': token} });
  }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  editstatus(leaveid,leave,roles): Observable<any> {
    return this.http.put(LEAVE_API + 'updatestatus/'+leaveid, {
      username: leave.username,
      leavetype: leave.leavetype,
      startdate: leave.startdate,
      enddate: leave.enddate,
      status: leave.status,
      roles: roles
    }, { responseType: 'json' });
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      password: user.password,
      mobile: user.mobile,
      roles: ['user']
    }, httpOptions);
  }
}
