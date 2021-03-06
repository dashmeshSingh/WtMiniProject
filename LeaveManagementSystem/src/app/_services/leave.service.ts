import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8080/api/test/';
const LEAVE_API = 'http://localhost:8080/api/test/viewone';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http: HttpClient) { }

  Applyleave(leave,range): Observable<any> {
    return this.http.post(AUTH_API + 'leave', {
      username: leave.username,
      leavetype: leave.leavetype,
      startdate: range.value.start,
      enddate: range.value.end,
      roles:["user"]
    }, httpOptions);
  }

  getallleaves(username): Observable<any> {
    return this.http.get(AUTH_API + 'viewall/'+username, { responseType: 'json' });
  }

  
  getleave(id): Observable<any> {
    console.log(id);
    return this.http.get(AUTH_API + 'viewone/'+id, { responseType: 'json' });
  }

  editleave(leaveid,leave,range,roles): Observable<any> {
    return this.http.put(AUTH_API + 'update/'+leaveid, {
      username: leave.username,
      leavetype: leave.leavetype,
      startdate: range.value.start,
      enddate: range.value.end,
      roles: roles,
    }, { responseType: 'json' });
  }

  deleteleave(leaveid): Observable<any> {
    return this.http.delete(AUTH_API + 'delete/'+ leaveid, { responseType: 'json' });
  }
}
function _id(_id: any) {
  throw new Error('Function not implemented.');
}

