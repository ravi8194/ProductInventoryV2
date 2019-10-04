import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

import { SharedService } from './shared.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  MatButtonModule,
  MatNativeDateModule,
  MatIconModule,
  MatBadgeModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatCardModule,
  MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatCardModule,
    NgxSpinnerModule,
    NgbModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatIconModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatCardModule,
    NgxSpinnerModule,
    MatListModule
  ],
  entryComponents: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [SharedService]
    };
  }
}
