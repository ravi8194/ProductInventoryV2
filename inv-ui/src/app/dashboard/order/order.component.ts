import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderList: Array<any>;
  decodedToken: AppModel.Token;
  isUser: boolean;
  userId: string;
  userRating: number;

  constructor(
    private coreService: CoreService,
    config: NgbRatingConfig,
    private route: ActivatedRoute
  ) {
    config.max = 5;
    config.readonly = false;
  }

  ngOnInit() {
    this.orderList = [{}];
    this.userRating = 5;
    this.isUser = this.coreService.isUser;
    this.userId = this.coreService.userId;
    this.getOrderList();
  }
  getOrderList() {
    this.route.data.subscribe(res => {
      this.orderList = res.orderList.order;
    });
  }
}
