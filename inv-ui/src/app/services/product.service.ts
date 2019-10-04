import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoreService } from '../core/core.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  token: any;
  product: Array<any> = [];
  redirectUrl = `${environment.baseUrl}/product`;
  orderUrl = `${environment.baseUrl}/order`;
  cartItemKey;

  constructor(private http: HttpClient, private coreService: CoreService) {}

  getProductList(parameter?): Observable<any> {
    return this.http.get<any>(this.redirectUrl, { params: parameter });
  }
  getProductDetail(id: string): Observable<any> {
    return this.http.get<any>(`${this.redirectUrl}/${id}`);
  }
  update(data, id): Observable<any> {
    console.log('formdata' + data);
    return this.http.post<any>(`${this.redirectUrl}/update/${id}`, data);
  }
  add(data) {
    return this.http.post<any>(`${this.redirectUrl}/add`, data);
  }
  delete(data) {
    return this.http.delete<any>(`${this.redirectUrl}/delete/${data}`);
  }
  getCategoryList() {
    return this.http.get(`${environment.baseUrl}/categories/`);
  }
  getSubCategoryList(categoryId) {
    return this.http.get<any>(
      `${environment.baseUrl}/categories/subCategory/${categoryId}`
    );
  }
  softDelete(data) {
    return this.http.put<any>(`${this.redirectUrl}/softDelete`, data);
  }
  getOrderList(data) {
    return this.http.get<any>(`${this.orderUrl}/${data}`);
  }
  createOrder(data) {
    return this.http.post<any>(`${this.orderUrl}/create`, data);
  }
  addToCart(product) {
    this.product.push(product);
    const cartData = { data: this.product };
    localStorage.setItem(
      `${this.coreService.userId}`,
      JSON.stringify(cartData)
    );
  }
  getCartItem() {
    return localStorage.getItem(`${this.coreService.userId}`);
  }
  deleteCartItem() {
    return localStorage.removeItem(`${this.coreService.userId}`);
  }
  setCartItem(cartData) {
    return localStorage.setItem(
      `${this.coreService.userId}`,
      JSON.stringify(cartData)
    );
  }
}
