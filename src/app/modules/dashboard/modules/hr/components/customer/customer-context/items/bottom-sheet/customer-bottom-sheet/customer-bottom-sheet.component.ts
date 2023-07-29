import { Component, OnInit } from '@angular/core';
import {EmployeePopUpComponent} from "../../../../../Employee/employee-context/items/pop-up/employee-update-pop-up/employee-pop-up.component";
import {MatDialog} from "@angular/material/dialog";
import {CustomerUpdatePopUpComponent} from "../../pop-up/customer-update-pop-up/customer-update-pop-up.component";
import {CustomerDeletePopUpComponent} from "../../pop-up/customer-delete-pop-up/customer-delete-pop-up.component";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {UnitTypeUpdatePopUpComponent} from "../../../../../../../daily-process/components/unit-type/unit-type-context/all-unit-type/inner-items/pop-up/unit-type-update-pop-up/unit-type-update-pop-up.component";
import {UnitTypeDeletePopUpComponent} from "../../../../../../../daily-process/components/unit-type/unit-type-context/all-unit-type/inner-items/pop-up/unit-type-delete-pop-up/unit-type-delete-pop-up.component";

@Component({
  selector: 'app-customer-bottom-sheet',
  templateUrl: './customer-bottom-sheet.component.html',
  styleUrls: ['./customer-bottom-sheet.component.scss']
})
export class CustomerBottomSheetComponent implements OnInit {

  allCustomers:any=[];

  constructor(private dialog: MatDialog,private _bottomSheetRef: MatBottomSheetRef,) { }

  ngOnInit(): void {
  }

  UpdatePopUp(event: MouseEvent): void {
    this.dialog.open(CustomerUpdatePopUpComponent, {
      width: '1000px',
      data: this.allCustomers,
    });
    this.closeModal(event);
  }



  closeModal(event: MouseEvent) {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
