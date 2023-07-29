import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UnitTypeService} from "../../../../../../../../../../share/service/unit-type/unit-type.service";
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";
import {FuelTypeService} from "../../../../../../../../../../share/service/fuel-type/fuel-type.service";

@Component({
  selector: 'app-update-fuel-type-pop-up',
  templateUrl: './update-fuel-type-pop-up.component.html',
  styleUrls: ['./update-fuel-type-pop-up.component.scss']
})
export class UpdateFuelTypePopUpComponent implements OnInit {

  updateFuelTypeForm = new FormGroup({
    fuelTypeName: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
  });

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public fuelType: any,
    private fuelTypeService: FuelTypeService,
    private commonSnackBarService: CommonSnackBarService) {
  }

  ngOnInit(): void {
    this.loadFuelTypeData()
  }

  loadFuelTypeData() {
    if (this.fuelType) {
      this.updateFuelTypeForm.patchValue({
        fuelTypeName: this.fuelType.displayName
      })
    }
  }

  updateData(formDirective: FormGroupDirective) {
    let fuelTypeName = this.updateFuelTypeForm.get('fuelTypeName')?.value;

    this.fuelTypeService.updateFuelType(this.fuelType.fuelId,
      fuelTypeName
    ).subscribe(response => {
      console.log(response)
      if (response.code === 204) {
        this.clearFields(formDirective, this.updateFuelTypeForm);
        this.openSnackBar(response.message, 'close');
        this.closeDialog();
      } else {
        this.openSnackBar('Something went wrong try again!', 'close');
      }
    })

  }

  openSnackBar(message: string, action: string) {
    this.commonSnackBarService.trigger(message, action, [
      10000, 'success-snack-bar-common',
      'end',
      'top'
    ]);
  }

  clearFields(formDirective: FormGroupDirective, form: FormGroup): void {
    form.reset(); // Reset form data
    formDirective.resetForm(); // Reset the ugly validators
  }

  closeDialog(): void {
    this.dialogRef.close();
    location.reload();
  }

}
