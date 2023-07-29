import {Component, OnInit} from '@angular/core';
import {TabItem} from "../../../../../../share/dto/TabItem";

@Component({
  selector: 'app-damaged-details-context',
  templateUrl: './damaged-details-context.component.html',
  styleUrls: ['./damaged-details-context.component.scss']
})
export class DamagedDetailsContextComponent implements OnInit {

  tabs: TabItem[] = [
    {
      label: 'Damage Details History',
      icon: 'apartment',
      route: '/dashboard/access/daily-process/damage-detail/damage-details-history'

    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
