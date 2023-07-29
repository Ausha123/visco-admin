import { Component, OnInit } from '@angular/core';
import {TabItem} from "../../../../../../share/dto/TabItem";

@Component({
  selector: 'app-special-discount-context',
  templateUrl: './special-discount-context.component.html',
  styleUrls: ['./special-discount-context.component.scss']
})
export class SpecialDiscountContextComponent implements OnInit {

  tabs: TabItem[] = [
    {
      label: 'new discount',
      icon: 'apartment',
      route: '/dashboard/access/finance/special-discount/new-discount'

    },
    {
      label: 'discount history',
      icon: 'apartment',
      route: '/dashboard/access/finance/special-discount/discount-history'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
