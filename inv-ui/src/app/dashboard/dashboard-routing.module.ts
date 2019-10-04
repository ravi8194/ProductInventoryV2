import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { DashboardComponent } from './dashboard.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { OrderResolveService } from '../services/order-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'order/:id',
        component: OrderComponent,
        resolve: { orderList: OrderResolveService }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
