import {Component, OnInit} from '@angular/core';
import {TabItem} from "../../../../../../share/dto/TabItem";

@Component({
  selector: 'app-fuel-context',
  templateUrl: './fuel-context.component.html',
  styleUrls: ['./fuel-context.component.scss']
})
export class FuelContextComponent implements OnInit {

  tabs: TabItem[] = [
    {
      label: '+ New Fuel Type',
      icon: 'apartment',
      route: '/dashboard/access/daily-process/fuel-type/new-fuel-type'

    },
    {
      label: 'All Fuel Type',
      icon: 'apartment',
      route: '/dashboard/access/daily-process/fuel-type/all-fuel-types'

    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
