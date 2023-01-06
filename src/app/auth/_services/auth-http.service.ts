import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
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
    // return this.http.post<any>(API_USERS_URL+"/login", data);
    if(email == 'email' && password == 'password') 
    return of({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9lIFNhbSJ9.RpYD7qsSX8UvhHeBarSe67yJo-OXU2UNtIvmme0u2vo'})
     else 
    return throwError(()=>new Error('login inválido'));
  }
  
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(API_USERS_URL);
  }
}
