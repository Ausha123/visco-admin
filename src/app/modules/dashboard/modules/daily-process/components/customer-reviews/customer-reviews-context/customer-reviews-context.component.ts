import {Component, OnInit} from '@angular/core';
import {TabItem} from "../../../../../../share/dto/TabItem";

@Component({
  selector: 'app-customer-reviews-context',
  templateUrl: './customer-reviews-context.component.html',
  styleUrls: ['./customer-reviews-context.component.scss']
})
export class CustomerReviewsContextComponent implements OnInit {

  tabs: TabItem[] = [
    {
      label: 'All Customer Reviews',
      icon: 'apartment',
      route: '/dashboard/access/daily-process/customer-reviews/all-customer-reviews'

    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
