import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  decodedToken;
  userId: string;
  private notified = new Subject<{ option: string; value: any }>();
  notifyAsObservable$ = this.notified.asObservable();
  userName: string;
  isUser: boolean;
  isAdmin: boolean;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showError(message: string) {
    this.toastr.error(message);
  }
  showWarning(message: string) {
    this.toastr.warning(message);
  }
  showInfo(message: string) {
    this.toastr.info(message);
  }
  navigateTo(url) {
    this.router.navigate([url]);
  }
  public notify(data: { option: string; value: any }) {
    if (data) {
      this.notified.next(data);
    }
  }
  setValue() {
    this.decodedToken = this.tokenService.decodeToken();
    this.userId = this.decodedToken.userId;
    this.userName = this.decodedToken.userName;
    this.isUser = this.decodedToken.role === 'user' ? true : false;
    this.isAdmin = this.decodedToken.role === 'admin' ? true : false;
    this.userId = this.decodedToken.userId;
  }
}
