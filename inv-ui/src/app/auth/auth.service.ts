import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomAuthService {
  public redirectBackToUrl: string;
  token: string;
  redirectUrl = `${environment.baseUrl}/users`;
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {}

  isExpired;
  login(data) {
    return this.http.post<any>(`${this.redirectUrl}/login`, data);
  }
  socialLogin(token) {
    return this.http.post<any>(`${this.redirectUrl}/socialLogin`, {
      authToken: token
    });
  }
  isLoggedIn() {
    this.token = this.tokenService.getToken();
    return !this.tokenService.isTokenExpired();
  }
  logout(): void {
    localStorage.removeItem('token');
    // tslint:disable-next-line: no-unused-expression
    this.router.navigate['/login'];
  }
  signup(data) {
    return this.http.post<any>(`${this.redirectUrl}/signup`, data);
  }
  getUserList(parameter?): Observable<any> {
    return this.http.get<any>(this.redirectUrl, { params: parameter });
  }
}
