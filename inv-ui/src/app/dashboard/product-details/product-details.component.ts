import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import {
  NgbActiveModal,
  NgbRatingConfig,
  NgbModalOptions,
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductService } from '../../services/product.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailsComponent implements OnInit {
  closeResult: string;
  @Input() public product;
  name: string;
  isAdmin: boolean;
  isUser: boolean;
  userId: string;
  constructor(
    public modal: NgbActiveModal,
    config: NgbRatingConfig,
    private modalService: NgbModal,
    private productService: ProductService,
    private coreService: CoreService
  ) {
    config.max = 5;
    config.readonly = true;
  }
  ngOnInit() {
    this.coreService.notifyAsObservable$.subscribe(res => {
      if (res.option === 'cartItem') {
        this.productService.product = res.value;
      }
    });
    this.name = this.product.productName;
    this.userId = this.coreService.userId;
    this.isAdmin = this.coreService.isAdmin;
    this.isUser = this.coreService.isUser;
  }
  openVerticallyCentered(data) {
    const options: NgbModalOptions = {
      size: 'md',
      backdrop: 'static',
      centered: true,
      keyboard: true
    };

    const modalRef = this.modalService.open(ProductAddComponent, options);
    modalRef.componentInstance.product = data;
  }
  softDelete(e) {
    this.productService
      .softDelete({ _id: this.product._id, value: e.checked })
      .subscribe(res => {
        if (res && res.success) {
          this.coreService.showSuccess(res.message);
          this.coreService.notify({ option: 'product', value: res });
          this.modal.close();
        } else {
          this.coreService.showError(res.message);
        }
      });
  }
  buyNow(data) {
    const orderData = {
      userId: this.userId,
      productId: data._id,
      quantity: 1
    };
    this.productService.createOrder(orderData).subscribe(res => {
      if (res && res.success) {
        this.coreService.showSuccess(res.message);
      }
    });
  }
  addToCart(product) {
    const cartItem = this.productService.getCartItem();
    if (cartItem) {
      this.productService.product = JSON.parse(cartItem).data;
    }
    this.productService.addToCart(product);
    this.coreService.notify({ option: 'cartChange', value: { cartCount: 1 } });
  }
}
