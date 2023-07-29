import {Component, OnInit} from '@angular/core';
import {TabItem} from "../../../../../../share/dto/TabItem";

@Component({
  selector: 'app-product-context',
  templateUrl: './product-context.component.html',
  styleUrls: ['./product-context.component.scss']
})
export class ProductContextComponent implements OnInit {

  tabs: TabItem[] = [
    {
      label: '+ New Product',
      icon: 'apartment',
      route: '/dashboard/access/daily-process/product/new-product'

    },
    {
      label: 'All Products',
      icon: 'apartment',
      route: '/dashboard/access/daily-process/product/all-products'

    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
