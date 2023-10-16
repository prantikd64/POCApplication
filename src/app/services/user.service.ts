import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }
  
  getContacts(): Observable<any> {
    let url: string =  "http://localhost:5042/api/Contact";
    return this.http.get<any>(url);
  }

  createContact(payload: any): Observable<any> {
    let url = "http://localhost:5042/api/Contact";
    return this.http.post<any>(url,payload);
  }

  updateContact(payload: any): Observable<any> {
    let url = "http://localhost:5042/api/Contact";
    return this.http.put<any>(url,payload);
  }

  deleteContact(id: any): Observable<any> {
    let url = "http://localhost:5042/api/Contact?id=" + id;
    return this.http.delete<any>(url);
  }

}
