import {Component, OnInit} from '@angular/core';
import {TabItem} from "../../../../../../share/dto/TabItem";

@Component({
  selector: 'app-unit-type-context',
  templateUrl: './unit-type-context.component.html',
  styleUrls: ['./unit-type-context.component.scss']
})
export class UnitTypeContextComponent implements OnInit {

  tabs: TabItem[] = [
    {
      label: '+ New Unit Type',
      icon: 'apartment',
      route: '/dashboard/access/daily-process/unit-type/new-unit-type'
    },
    {
      label: 'All Unit Types',
      icon: 'apartment',
      route: '/dashboard/access/daily-process/unit-type/all-unit-types'
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
