import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";
import {DamagedDetailsService} from "../../../../../../../../../../share/service/damaged-details/damaged-details.service";
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-damage-details-pop-up',
  templateUrl: './update-damage-details-pop-up.component.html',
  styleUrls: ['./update-damage-details-pop-up.component.scss']
})
export class UpdateDamageDetailsPopUpComponent implements OnInit {

  updateDamageDetailsForm = new FormGroup({
    fine: new FormControl(null,
      [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ]),
    note: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255)
      ])
  });

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public details: any,
    private damagedDetailsService: DamagedDetailsService,
    private commonSnackBarService: CommonSnackBarService,
  ) {
  }

  ngOnInit(): void {
    console.log(this.details)
    this.loadDamagedDetails()
  }

  loadDamagedDetails() {
    if (this.details) {
      this.updateDamageDetailsForm.patchValue({
        customerNic: 10,
        fine: this.details.fine,
        note:this.details.note
      })
    }
  }


  updateData(formDirective: FormGroupDirective) {
    let fine = this.updateDamageDetailsForm.get('fine')?.value;
    let note = this.updateDamageDetailsForm.get('note')?.value;

    this.damagedDetailsService.updateDamagedDetails(
      this.details.damageId,
      fine,
      note
    ).subscribe(response => {
      console.log(response)
      if (response.code === 204) {
        this.clearFields(formDirective, this.updateDamageDetailsForm);
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
