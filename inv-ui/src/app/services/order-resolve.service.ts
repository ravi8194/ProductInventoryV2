import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ProductService } from './product.service';
@Injectable({
  providedIn: 'root'
})
export class OrderResolveService implements Resolve<any> {
  constructor(private productService: ProductService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    const id = route.paramMap.get('id');
    return this.productService.getOrderList(id).pipe(
      mergeMap(orderList => {
        if (orderList) {
          return of(orderList);
        } else {
          this.router.navigate(['/dashboard/product']);
          return EMPTY;
        }
      })
    );
  }
}
