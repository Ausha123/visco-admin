import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RentDataService} from "../../../../../../../../../../share/service/rent-data/rent-data.service";
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";
import {DamagedDetailsService} from "../../../../../../../../../../share/service/damaged-details/damaged-details.service";
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-damaged-data',
  templateUrl: './new-damaged-data.component.html',
  styleUrls: ['./new-damaged-data.component.scss']
})
export class NewDamagedDataComponent implements OnInit {

  newDamageDetailForm = new FormGroup({
    fine: new FormControl(null,
      [Validators.required]),
    note: new FormControl(null,
      [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public rentId: string,
    private damagedDetailsService: DamagedDetailsService,
    private commonSnackBarService: CommonSnackBarService,
  ) { }

  ngOnInit(): void {
  }

  submitData(formDirective: FormGroupDirective) {
    let fine = this.newDamageDetailForm.get('fine')?.value;
    let note = this.newDamageDetailForm.get('note')?.value;

    this.damagedDetailsService.newDamageDetail(
      this.rentId,
      fine,
      note
    ).subscribe(response => {
      console.log(response)
      if (response.code === 201) {
        this.clearFields(formDirective, this.newDamageDetailForm);
        this.openSnackBar(response.message, 'close');
        location.reload();
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
