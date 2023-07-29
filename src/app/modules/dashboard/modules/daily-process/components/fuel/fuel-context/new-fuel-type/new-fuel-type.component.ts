import { Component, OnInit } from '@angular/core';
import {BrandService} from "../../../../../../../share/service/Brand/brand.service";
import {CommonSnackBarService} from "../../../../../../../share/service/core/common-snack-bar-service.service";
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {FuelTypeService} from "../../../../../../../share/service/fuel-type/fuel-type.service";

@Component({
  selector: 'app-new-fuel-type',
  templateUrl: './new-fuel-type.component.html',
  styleUrls: ['./new-fuel-type.component.scss']
})
export class NewFuelTypeComponent implements OnInit {

  newFuelTypeForm = new FormGroup({
    fuelTypeName: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
  });

  constructor(private fuelTypeService: FuelTypeService,
              private commonSnackBarService: CommonSnackBarService
  ) {
  }

  ngOnInit(): void {
  }

  submitData(formDirective: FormGroupDirective) {
    let fuelTypeName = this.newFuelTypeForm.get('fuelTypeName')?.value;

    this.fuelTypeService.newFuelType(
      fuelTypeName

    ).subscribe(response => {
      console.log(response)
      if (response.code === 201) {
        this.clearFields(formDirective, this.newFuelTypeForm);
        this.openSnackBar(response.message, 'close');
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

}
