import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SidebarModule } from 'ng-sidebar';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FourzerofourComponent } from './fourzerofour/fourzerofour.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { CoreModule } from './core/core.module';
import { Interceptor } from './interceptors/http.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderService } from './shared/loader/loader.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [AppComponent, FourzerofourComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    NgbModule,
    FlexLayoutModule,
    SidebarModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['http://localhost:4200']
      }
    }),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
