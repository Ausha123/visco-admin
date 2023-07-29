import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UnitTypeService} from "../../../../../../../../../../share/service/unit-type/unit-type.service";
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";
import {RentDataService} from "../../../../../../../../../../share/service/rent-data/rent-data.service";

@Component({
  selector: 'app-view-rent-data-pop-up',
  templateUrl: './view-rent-data-pop-up.component.html',
  styleUrls: ['./view-rent-data-pop-up.component.scss']
})
export class ViewRentDataPopUpComponent implements OnInit {

  allRentDataArray: Array<any> = [];

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rentDataService: RentDataService,
    private commonSnackBarService: CommonSnackBarService,
  ) { }

  ngOnInit(): void {
    this.searchRentDataById();
  }

  searchRentDataById(){
    this.rentDataService.viewAllRentDataById(this.data.rentId). subscribe(response => {
      this.allRentDataArray = response.data;
      console.log(this.allRentDataArray)
    }, error => {
      console.log(error);
      this.commonSnackBarService.warningSnackBar(
        'Something went wrong! please try again a while later.',
        'close',
        [5000, 'warning-snack-bar-common']
      );
    })
  }
}
