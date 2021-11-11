import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class ViewleavesService {

  constructor(private http: HttpClient) { }

  getallleaves(username): Observable<any> {
    return this.http.get(API_URL + 'viewall/'+username, { responseType: 'text' });
  }
}
