import { Component, OnInit } from '@angular/core';
import {TabItem} from "../../../../../../share/dto/TabItem";

@Component({
  selector: 'app-rental-payment-context',
  templateUrl: './rental-payment-context.component.html',
  styleUrls: ['./rental-payment-context.component.scss']
})
export class RentalPaymentContextComponent implements OnInit {

  tabs: TabItem[] = [
    {
      label: 'new rental payment',
      icon: 'apartment',
      route: '/dashboard/access/finance/rental-payment/new-rental-payment'

    },
    {
      label: 'rental payment history',
      icon: 'apartment',
      route: '/dashboard/access/finance/rental-payment/rental-payment-history'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
