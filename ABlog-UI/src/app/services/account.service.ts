import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ApplicationUserCreate } from '../models/account/application-user-create.model';
import { ApplicationUserLogin } from '../models/account/application-user-login.model';
import { ApplicationUser } from '../models/account/application-user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSubject$: BehaviorSubject<ApplicationUser | null>

  constructor(
    private http: HttpClient
  ) { 
    this.currentUserSubject$ = new BehaviorSubject<ApplicationUser | null>(JSON.parse(localStorage.getItem('ABlog-currentUser') as string));
  }

  login(model: ApplicationUserLogin) : Observable<ApplicationUser>  {
    return this.http.post<ApplicationUser>(`${environment.webApi}/Account/login`, model).pipe(
      map((user : ApplicationUser) => {

        if (user) {
          localStorage.setItem('ABlog-currentUser', JSON.stringify(user));
          this.setCurrentUser(user);
        }

        return user;
      })
    )
  }

  register(model: ApplicationUserCreate) : Observable<ApplicationUser> {
    return this.http.post<ApplicationUser>(`${environment.webApi}/Account/register`, model).pipe(
      map((user : ApplicationUser) => {

        if (user) {
          localStorage.setItem('ABlog-currentUser', JSON.stringify(user));
          this.setCurrentUser(user);
        }

        return user;
      })
    )
  }

  setCurrentUser(user: ApplicationUser) {
    this.currentUserSubject$.next(user);
  }

  public get currentUserValue(): ApplicationUser | null {
    return this.currentUserSubject$.value;
  }

  public givenUserIsLoggedIn(username: string) {
    return this.isLoggedIn() && this.currentUserValue?.username === username;
  }

  public isLoggedIn() {
    const currentUser = this.currentUserValue;
    const isLoggedIn = !!currentUser && !!currentUser.token;
    return isLoggedIn;
  }

  logout() {
    localStorage.removeItem('ABlog-currentUser');
    this.currentUserSubject$.next(null);
  }
}
