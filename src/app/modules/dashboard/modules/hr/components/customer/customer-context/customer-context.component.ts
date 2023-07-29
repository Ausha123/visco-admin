import { Component, OnInit } from '@angular/core';
import {TabItem} from "../../../../../../share/dto/TabItem";

@Component({
  selector: 'app-customer-context',
  templateUrl: './customer-context.component.html',
  styleUrls: ['./customer-context.component.scss']
})
export class CustomerContextComponent implements OnInit {

  tabs: TabItem[] = [
    {
      label: 'New Customer',
      icon: 'apartment',
      route: '/dashboard/access/hr/customer/newCustomer'

    },
    {
      label: 'All Customer',
      icon: 'apartment',
      route: '/dashboard/access/hr/customer/AllCustomer'

    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
