import {animate, style, transition, trigger} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-context',
  templateUrl: './dashboard-context.component.html',
  styleUrls: ['./dashboard-context.component.scss'],
  animations: [
    trigger('navSlider', [
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate('0.2s')
      ]),
      transition('* => void', [
        animate('0.2s', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class DashboardContextComponent implements OnInit {

  slideType:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

  slide() {
    this.slideType =!this.slideType;
  }

}
