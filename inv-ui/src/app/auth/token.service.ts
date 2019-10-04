import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private helper: JwtHelperService) {}
  isTokenExpired() {
    return this.helper.isTokenExpired(this.getToken());
  }
  getToken() {
    return localStorage.getItem('token');
  }
  decodeToken() {
    return this.helper.decodeToken(this.getToken());
  }
}
