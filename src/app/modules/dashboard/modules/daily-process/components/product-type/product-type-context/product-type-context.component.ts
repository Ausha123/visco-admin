import {Component, OnInit} from '@angular/core';
import {TabItem} from "../../../../../../share/dto/TabItem";

@Component({
  selector: 'app-product-type-context',
  templateUrl: './product-type-context.component.html',
  styleUrls: ['./product-type-context.component.scss']
})
export class ProductTypeContextComponent implements OnInit {

  tabs: TabItem[] = [
    {
      label: '+ New Product Type',
      icon: 'apartment',
      route: '/dashboard/access/daily-process/product-type/new-product-type'

    },
    {
      label: 'All Product Types',
      icon: 'apartment',
      route: '/dashboard/access/daily-process/product-type/all-product-types'

    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
