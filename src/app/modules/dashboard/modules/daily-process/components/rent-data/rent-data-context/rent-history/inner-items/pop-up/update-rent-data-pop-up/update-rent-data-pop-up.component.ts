import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-rent-data-pop-up',
  templateUrl: './update-rent-data-pop-up.component.html',
  styleUrls: ['./update-rent-data-pop-up.component.scss']
})
export class UpdateRentDataPopUpComponent implements OnInit {

  customerNic: string[] = ['p1','p2'];

  constructor() { }

  ngOnInit(): void {
  }

}
