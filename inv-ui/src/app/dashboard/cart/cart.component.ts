import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItemList: Array<AppModel.Product>;
  totalAmount: number;
  decodedToken: AppModel.Token;
  productIds: Array<string>;
  userId: string;
  cartItemCount: number;
  constructor(
    private productService: ProductService,
    private coreService: CoreService
  ) {}

  ngOnInit() {
    this.userId = this.coreService.userId;
    this.totalAmount = 0;
    this.productIds = [];
    this.cartItemList = [];
    const cartItem = this.productService.getCartItem();
    if (cartItem) {
      this.cartItemCount = JSON.parse(cartItem).data.length;
    } else {
      this.cartItemCount = 0;
    }

    this.coreService.notifyAsObservable$.subscribe(res => {
      if (res.option === 'cartItem') {
        this.cartItemList = res.value;
      }
    });
    this.coreService.notifyAsObservable$.subscribe(res => {
      if (res && res.option === 'cartChange') {
        this.cartItemCount += res.value.cartCount;
        this.totalAmount = res.value.cartPrice;
      }
    });

    this.calculateTotalAmount();
  }
  placeOrder() {
    const orderData = {
      userId: this.userId,
      productId: this.productIds,
      quantity: 1
    };
    this.productService.createOrder(orderData).subscribe(res => {
      if (res && res.success) {
        this.coreService.showSuccess(res.message);
        this.productService.deleteCartItem();
        this.cartItemList = [];
        this.coreService.notify({
          option: 'cartItem',
          value: this.cartItemList
        });
      }
    });
  }
  removecartItem(i) {
    this.productIds.splice(i, 1);
    const deletedItem = this.cartItemList.splice(i, 1);
    const cartData = { data: this.cartItemList };
    this.productService.setCartItem(cartData);
    this.coreService.notify({
      option: 'cartChange',
      value: {
        cartCount: -1,
        cartPrice: this.totalAmount - deletedItem[0].price
      }
    });
  }
  calculateTotalAmount() {
    const cartItem = JSON.parse(this.productService.getCartItem());
    if (cartItem) {
      this.cartItemList = cartItem.data;
      for (const data of this.cartItemList) {
        this.totalAmount += data.price;
        this.productIds.push(data._id);
      }
    }
  }
}
