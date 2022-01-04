import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';


const API_USERS_URL = `${environment.apiUrl}/api`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) { }

  // public methods
  login(email: string, password: string): Observable<any> {
    const notFoundError = new Error('Not Found');
    if (!email || !password) {
      return of(notFoundError);
    }
    var data = {
      "password": password,
      "username": email
    }
    return this.http.post<any>(API_USERS_URL+"/login", data);
  }
  
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(API_USERS_URL);
  }
}
