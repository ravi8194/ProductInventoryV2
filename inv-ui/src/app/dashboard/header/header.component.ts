import {
  Component,
  OnInit,
  Input,
  HostListener,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CustomAuthService } from '../../auth/auth.service';
import { ProductAddComponent } from '../product-add/product-add.component';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSidenav } from '@angular/material';
import { SidenavService } from '../../services/sidenav.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() inputSideNav: MatSidenav;
  @ViewChild('stickyMenu', null) menuElement: ElementRef;
  decodedToken: AppModel.Token;
  userName: string;
  isLoggedIn: boolean;
  isUser: boolean;
  userId: string;
  cartItemCount: number;
  sticky: boolean;

  constructor(
    private authService: CustomAuthService,
    private modalService: NgbModal,
    private sidenav: SidenavService,
    public router: Router,
    private coreService: CoreService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.sticky = false;

    this.coreService.setValue();
    this.coreService.notifyAsObservable$.subscribe(res => {
      if (res.option === 'cartItem') {
        this.cartItemCount = 0;
      }
    });
    const cartItem = this.productService.getCartItem();
    if (cartItem) {
      this.cartItemCount = JSON.parse(cartItem).data.length;
    } else {
      this.cartItemCount = 0;
    }
    this.coreService.notifyAsObservable$.subscribe(res => {
      if (res && res.option === 'cartChange') {
        this.cartItemCount += res.value.cartCount;
      }
    });
    this.userName = this.coreService.userName;
    this.isUser = this.coreService.isUser;
    this.userId = this.coreService.userId;
  }
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }
  openVerticallyCentered() {
    const options: NgbModalOptions = {
      size: 'md',
      backdrop: 'static',
      centered: true,
      keyboard: true
    };
    this.modalService.open(ProductAddComponent, options);
  }
  toggleSideNav() {
    this.sidenav.toggle();
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= 10) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }
}
