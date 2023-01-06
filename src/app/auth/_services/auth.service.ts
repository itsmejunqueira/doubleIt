import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthModel } from '../model/auth.model';
import { AuthHTTPService } from './auth-http.service';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  forgotPassword(value: any) {
    throw new Error('Method not implemented.');
  }
  // private fields
  private unsubscribe: Subscription[] = []; 
  private authLocalStorageToken: string = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<any>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<any>;
  isLoadingSubject: BehaviorSubject<boolean>;


  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: any) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<any>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.getUserByToken();
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  // public methods
  login(email: string, password: string): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.login(email, password).pipe(
      map((res) => {
        const auth = new AuthModel();
        auth.token = res.token;
        auth.expiresIn = new Date(Date.now() + 3600);
        const result = this.setAuthFromLocalStorage(auth);
        this.setUserFromLocalStorage(res.token);
        return result;
      }),
      switchMap((res) => {
        return this.getUserByToken();
      }),
      catchError((err) => of(null)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    this.currentUserSubject = new BehaviorSubject<any>(undefined);
    this.router.navigate(['/login'], {
      queryParams: {},
    });
  }

  getUserByToken(): Observable<any> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.token) {
      return of(undefined);
    }

    if (new Date(auth.expiresIn) >= new Date(Date.now())) {
      let user = this.getUserFromLocalStorage();

      this.currentUserSubject = new BehaviorSubject<any>(user);
      return of(user)
    } else {
      this.logout();
      return of(undefined);
    }
  }

  // private methods
  private setAuthFromLocalStorage(auth) {
    localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
  }

  public getAuthFromLocalStorage(): AuthModel {
    try {
      const authData = JSON.parse(localStorage.getItem(this.authLocalStorageToken) || '{}');
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem("logged-user") || '{}');
  }

  private setUserFromLocalStorage(user) {
    var decoded = jwt_decode(user);
    localStorage.setItem("logged-user", JSON.stringify(decoded['name']));
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
