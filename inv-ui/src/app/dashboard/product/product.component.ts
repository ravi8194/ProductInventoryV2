import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import {
  NgbRatingConfig,
  NgbModal,
  NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import { HttpParams } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { CustomAuthService } from '../../auth/auth.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { TokenService } from 'src/app/auth/token.service';
import { MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material';
import { SidenavService } from '../../services/sidenav.service';
import { CoreService } from 'src/app/core/core.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [NgbRatingConfig]
})
export class ProductComponent implements OnInit {
  closeResult: string;
  @Input() public ProductList;
  @Output() public product = new EventEmitter();
  @ViewChild('filter', null) public filter: MatSidenav;
  data = [];
  isApiCallComplete: boolean;
  page: number;
  pageSize: string;
  pagesCount: number;
  params;
  status;
  productList: Array<AppModel.Product>;
  usersList: Array<AppModel.User>;
  productCount: number;
  isAdmin: boolean;
  decodedToken: AppModel.Token;
  categoryFormArray: Array<any>;
  showFiller = false;
  userFormArray: Array<any>;
  productDetails;
  Categories: AppModel.Category;
  isUser: boolean;
  constructor(
    private productService: ProductService,
    private authService: CustomAuthService,
    config: NgbRatingConfig,
    private modalService: NgbModal,
    private tokenService: TokenService,
    public media: MediaObserver,
    private sidenavService: SidenavService,
    private coreService: CoreService,
    private spinner: NgxSpinnerService
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
    this.sidenavService.setSidenav(this.filter);
    this.productService
      .getSubCategoryList('5d7e2e77e7f8400c94319e97')
      .subscribe(res => {
        this.Categories = res.category;
      });
    this.decodedToken = this.tokenService.decodeToken();
    this.isAdmin = this.coreService.isAdmin;
    this.isUser = this.coreService.isUser;
    this.categoryFormArray = [];
    this.userFormArray = [];
    this.productList = [];
    this.productCount = 0;
    this.page = 1;
    this.pageSize = '6';
    this.pagesCount = 1;
    this.productDetails = {};
    this.params = new HttpParams()
      .append('pageNo', JSON.stringify(this.page))
      .append('size', this.pageSize);
    this.coreService.notifyAsObservable$.subscribe(res => {
      if (res.option === 'product') {
        this.getProductList(this.params);
      }
    });
    this.getProductList(this.params);
    this.getUserList();
  }

  selectedProduct(data) {
    this.product.emit(data);
  }
  getProductList(parameter?) {
    this.spinner.show();
    this.productService.getProductList(parameter).subscribe(res => {
      if (res && res.success) {
        this.productList = res.product;
        this.productCount = res.product.length;
        this.pagesCount = res.pageCount;
        this.isApiCallComplete = true;
        this.spinner.hide();
      } else {
        this.coreService.showError(res.message);
      }
    });
  }
  getUserList(parameter?) {
    this.authService.getUserList(parameter).subscribe(res => {
      this.usersList = res.user;
    });
  }
  openVerticallyCentered(product) {
    const options: NgbModalOptions = {
      size: 'md',
      backdrop: 'static',
      centered: true,
      keyboard: true
    };
    this.productService.getProductDetail(product._id).subscribe(res => {
      this.productDetails = res.product;
      const modalRef = this.modalService.open(ProductDetailsComponent, options);
      modalRef.componentInstance.product = this.productDetails;
    });
  }
  onCategoryChange(category: string, isChecked: boolean) {
    if (isChecked) {
      this.categoryFormArray.push(category);
    } else {
      const index = this.categoryFormArray.indexOf(category);
      this.categoryFormArray.splice(index, 1);
    }
  }
  onUserChange(user: string, isChecked: boolean) {
    if (isChecked) {
      this.userFormArray.push(user);
    } else {
      const index = this.categoryFormArray.indexOf(user);
      this.userFormArray.splice(index, 1);
    }
  }
  onChangePage() {
    this.params = this.params
      .set('pageNo', JSON.stringify(this.page))
      .set('size', this.pageSize);
    this.getProductList(this.params);
  }
  filterProduct() {
    this.page = 1;
    const category = JSON.stringify(this.categoryFormArray);
    const user = JSON.stringify(this.userFormArray);
    this.params = this.params
      .set('category', category)
      .set('user', user)
      .set('pageNo', JSON.stringify(this.page))
      .set('size', this.pageSize);
    this.getProductList(this.params);
    // this.filter.toggle();
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
