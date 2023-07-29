import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BrandService} from "../../../../../../../../../../share/service/Brand/brand.service";
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";
import {FileUploadService} from "../../../../../../../../../../share/service/file-upload/file-upload.service";

@Component({
  selector: 'app-brand-update-pop-up',
  templateUrl: './brand-update-pop-up.component.html',
  styleUrls: ['./brand-update-pop-up.component.scss']
})
export class BrandUpdatePopUpComponent implements OnInit {

  fileImageUploadHiddenEverything: string = '';
  FileImageLink: any = '';
  fileImageOverlay: string = '';
  fileName = '';
  fileImageUploadChecker: boolean = true;
  fileImageUploadHiddenEverythingChecker: string = '';
  fileImageOverlayChecker: string = '';

  updateBrandForm = new FormGroup({
    brandName: new FormControl(null,
      [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ])
  });

  constructor(
    private brandService: BrandService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public brand: any,
    private commonSnackBarService: CommonSnackBarService,
    private fileUploadService: FileUploadService
  ) {
  }

  ngOnInit(): void {
    this.loadBrandData()
  }

  loadBrandData() {
    if (this.brand) {
      this.updateBrandForm.patchValue({
        brandName: this.brand.brandName
      })
    }
    this.FileImageLink = this.brand.displayImage;
  }

  updateData(formDirective: any) {
    let brandName = this.updateBrandForm.get('brandName')?.value;

    console.log(this.brand.brandId)
    this.brandService.updateBrand(
      this.brand.brandId,
      brandName,
      this.FileImageLink
    ).subscribe(response => {
      console.log(response)
      if (response.code === 204) {
        this.clearFields(formDirective, this.updateBrandForm);
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
