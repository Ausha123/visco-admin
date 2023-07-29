import {Component, OnInit} from '@angular/core';
import {TabItem} from "../../../../../../share/dto/TabItem";

@Component({
  selector: 'app-rent-data-context',
  templateUrl: './rent-data-context.component.html',
  styleUrls: ['./rent-data-context.component.scss']
})
export class RentDataContextComponent implements OnInit {

  tabs: TabItem[] = [
    {
      label: '+ New Rent Data',
      icon: 'apartment',
      route: '/dashboard/access/daily-process/rent-data/new-rent-data'

    },
    {
      label: 'Rent History',
      icon: 'apartment',
      route: '/dashboard/access/daily-process/rent-data/rent-data-history'

    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
