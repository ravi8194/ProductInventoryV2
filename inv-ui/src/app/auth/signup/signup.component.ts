import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/validation.service';
import { CustomAuthService } from '../auth.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  SignupForm: FormGroup;
  isSubmitted: boolean;
  activeForm: string;
  valid: boolean;
  constructor(
    private fb: FormBuilder,
    private authService: CustomAuthService,
    private coreService: CoreService
  ) {}

  ngOnInit() {
    this.isSubmitted = false;
    this.valid = false;
    this.SignupForm = this.fb.group({
      userName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(70)]
      ],
      email: [
        '',
        [
          Validators.required,
          ValidationService.emailValidator,
          Validators.maxLength(250)
        ]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      role: ['', Validators.required]
    });
  }
  // getting controls of form fields
  get formControls() {
    return this.SignupForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.SignupForm.valid) {
      const data = this.SignupForm.value;
      this.authService.signup(this.SignupForm.value).subscribe(
        (res: any) => {
          if (res.success) {
            this.coreService.showSuccess(res.message);
            this.SignupForm.reset();
            this.isSubmitted = false;
            this.coreService.navigateTo('login');
          } else {
            this.coreService.showError(res.message);
          }
        },
        err => {
          this.coreService.showError(err.message);
        }
      );
    }
  }
}
