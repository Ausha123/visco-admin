import {Component, OnInit} from '@angular/core';
import {TabItem} from "../../../../../../share/dto/TabItem";

@Component({
  selector: 'app-brand-context',
  templateUrl: './brand-context.component.html',
  styleUrls: ['./brand-context.component.scss']
})
export class BrandContextComponent implements OnInit {

  tabs: TabItem[] = [
    {
      label: '+ New Brand',
      icon: 'apartment',
      route: '/dashboard/access/daily-process/brand/new-brand'

    },
    {
      label: 'All Brand',
      icon: 'apartment',
      route: '/dashboard/access/daily-process/brand/all-brands'

    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
