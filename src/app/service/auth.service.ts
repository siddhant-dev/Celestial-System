import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient) { }

  login(email: string | any, password: string | any): Observable<any> {
    return this.httpClient.post('http://localhost:3000/login', {email, password});
  }

  updateAuthStatus(val:boolean) {
    this.isAuthenticated.next(val);
  }

  register(user: any): Observable<any> {
    return this.httpClient.post('http://localhost:3000/register', {...user});
  }
}
