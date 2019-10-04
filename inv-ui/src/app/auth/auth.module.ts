import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      '526576199143-2932qro1aidi96e05d3b7l8mbu5hcpm9.apps.googleusercontent.com'
    )
  }
  // {
  //   id: FacebookLoginProvider.PROVIDER_ID,
  //   provider: new FacebookLoginProvider('924971374325653')
  // }
  // {
  //   id: LinkedInLoginProvider.PROVIDER_ID,
  //   provider: new LinkedInLoginProvider("78iqy5cu2e1fgr")
  // }
]);

export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule, SocialLoginModule],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ]
})
export class AuthModule {}
