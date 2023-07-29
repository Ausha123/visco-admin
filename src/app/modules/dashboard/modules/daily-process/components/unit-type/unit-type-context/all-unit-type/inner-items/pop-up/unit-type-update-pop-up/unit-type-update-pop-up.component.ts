import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";
import {UnitTypeService} from "../../../../../../../../../../share/service/unit-type/unit-type.service";
import {FileUploadService} from "../../../../../../../../../../share/service/file-upload/file-upload.service";

@Component({
  selector: 'app-unit-type-update-pop-up',
  templateUrl: './unit-type-update-pop-up.component.html',
  styleUrls: ['./unit-type-update-pop-up.component.scss']
})
export class UnitTypeUpdatePopUpComponent implements OnInit {

  fileImageUploadHiddenEverything: string = '';
  FileImageLink: any;
  fileImageOverlay: string = '';
  fileName = '';
  fileImageUploadChecker: boolean = true;
  fileImageUploadHiddenEverythingChecker: string = '';
  fileImageOverlayChecker: string = '';

  updateUnitTypeForm = new FormGroup({
    unitTypeName: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
  });

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public unitType: any,
    private unitTypeService: UnitTypeService,
    private commonSnackBarService: CommonSnackBarService,
    private fileUploadService: FileUploadService
  ) {
  }

  ngOnInit(): void {
    this.loadUnitTypeData()
  }

  loadUnitTypeData() {
    if (this.unitType) {
      this.updateUnitTypeForm.patchValue({
        unitTypeName: this.unitType.unitName
      })
    }
    this.FileImageLink = this.unitType?.symbol
  }

  updateData(formDirective: FormGroupDirective) {
    let unitTypeName = this.updateUnitTypeForm.get('unitTypeName')?.value;

    this.unitTypeService.updateUnitType(
      this.unitType.unitId,
      unitTypeName,
      this.FileImageLink
    ).subscribe(response => {
      console.log(response)
      if (response.code === 204) {
        this.clearFields(formDirective, this.updateUnitTypeForm);
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

  onFileSelected(event: any) {
    console.log(event);
    let file: File = event.target.files[0];
    if (file) {
      console.log(file)
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('file', file);
      this.fileUploadService.upload(formData).subscribe(response => {
        this.FileImageLink = response;
        console.log(this.FileImageLink);
        this.fileImageUploadChecker = false;
        if (this.fileImageUploadChecker == false) {
          this.fileImageUploadHiddenEverythingChecker = 'none';
          this.fileImageUploadHiddenEverything = this.fileImageUploadHiddenEverythingChecker;
          this.fileImageOverlayChecker = 'rgba(201, 201, 201, 0.6)'
        }
      }, error1 => {
        console.log(error1)
      })
    }
  }
}
