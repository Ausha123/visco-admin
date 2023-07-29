import {Component, OnInit} from '@angular/core';
import {TabItem} from "../../../../../../share/dto/TabItem";

@Component({
  selector: 'app-maintain-data-context',
  templateUrl: './maintain-data-context.component.html',
  styleUrls: ['./maintain-data-context.component.scss']
})
export class MaintainDataContextComponent implements OnInit {

  tabs: TabItem[] = [
    {
      label: '+ New Maintain Data',
      icon: 'apartment',
      route: '/dashboard/access/daily-process/maintain-data/new-maintain-data'

    },
    {
      label: 'Maintain Data History',
      icon: 'apartment',
      route: '/dashboard/access/daily-process/maintain-data/maintain-data-history'

    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
