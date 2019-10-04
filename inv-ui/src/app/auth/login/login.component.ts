import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomAuthService } from '../auth.service';
import { AuthService } from 'angularx-social-login';
import { CoreService } from 'src/app/core/core.service';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;
  loginForm: FormGroup;
  isSubmitted: boolean;
  loggedIn: boolean;
  user: Partial<AppModel.User>;

  constructor(
    private fb: FormBuilder,
    private customAuthService: CustomAuthService,
    private coreService: CoreService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.authService.authState.subscribe((user: Partial<AppModel.User>) => {
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.customAuthService.login(this.loginForm.value).subscribe(
        res => {
          if (res.success) {
            // set token to localstorage
            localStorage.setItem('token', res.Token);
            this.coreService.notify({ option: 'isLoggedIn', value: true });
            // Redirect the dashboard
            this.coreService.navigateTo('/dashboard/product');
            // Toaster Message
            this.coreService.showSuccess(res.message);
            this.isSubmitted = false;
          } else {
            this.coreService.showError(res.message);
          }
        },
        // execute when error in api calling
        err => {
          this.coreService.showError(err.message);
        }
      );
    }
  }
  // getting controls of form fields
  get formControls() {
    return this.loginForm.controls;
  }
  signInWithGoogle(): void {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user: any) => {
        this.customAuthService.socialLogin(user.idToken).subscribe(res => {
          if (res && res.success) {
            localStorage.setItem('token', res.token);
            this.coreService.notify({ option: 'isLoggedIn', value: true });
            // Redirect the dashboard
            this.coreService.navigateTo('/dashboard/product');
            // Toaster Message
            this.coreService.showSuccess(res.message);
            this.isSubmitted = false;
          } else {
            this.coreService.showSuccess(res.message);
          }
        });
      });
  }

  signInWithFB(): void {
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((user: any) => {
        this.customAuthService.socialLogin(user.idToken).subscribe(res => {
          if (res && res.success) {
            localStorage.setItem('token', res.token);
            this.coreService.notify({ option: 'isLoggedIn', value: true });
            // Redirect the dashboard
            this.coreService.navigateTo('/dashboard/product');
            // Toaster Message
            this.coreService.showSuccess(res.message);
            this.isSubmitted = false;
          } else {
            this.coreService.showSuccess(res.message);
          }
        });
      });
  }
  signInWithLinkedIn(): void {}
  signOut(): void {
    this.authService.signOut();
  }
}
