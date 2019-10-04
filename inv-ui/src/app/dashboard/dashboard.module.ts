import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { ProductComponent } from './product/product.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { HeaderComponent } from './header/header.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoaderComponent } from '../shared/loader/loader.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductAddComponent,
    ProductDetailsComponent,
    HeaderComponent,
    DashboardComponent,
    LoaderComponent,
    CartComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CKEditorModule,
    NgbModule,
    FlexLayoutModule,
    MatSidenavModule,
    SidebarModule.forRoot(),
    SharedModule
  ],
  exports: [],
  entryComponents: [ProductDetailsComponent, ProductAddComponent]
})
export class DashboardModule {}
