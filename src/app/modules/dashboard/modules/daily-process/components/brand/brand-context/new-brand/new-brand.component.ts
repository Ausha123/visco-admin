import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {CommonSnackBarService} from "../../../../../../../share/service/core/common-snack-bar-service.service";
import {BrandService} from "../../../../../../../share/service/Brand/brand.service";
import {FileUploadService} from "../../../../../../../share/service/file-upload/file-upload.service";

@Component({
  selector: 'app-new-brand',
  templateUrl: './new-brand.component.html',
  styleUrls: ['./new-brand.component.scss']
})
export class NewBrandComponent implements OnInit {

  fileImageUploadHiddenEverything: string = '';
  FileImageLink: any = '';
  fileImageOverlay: string = '';
  fileName = '';
  fileImageUploadChecker: boolean = true;
  fileImageUploadHiddenEverythingChecker: string = '';
  fileImageOverlayChecker: string = '';

  newBrandForm = new FormGroup({
    brandName: new FormControl(null,
      [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ])
  });

  constructor(
    private brandService: BrandService,
    private commonSnackBarService: CommonSnackBarService,
    private fileUploadService: FileUploadService
  ) {
  }

  ngOnInit(): void {
  }

  submitData(formDirective: FormGroupDirective) {
    let brandName = this.newBrandForm.get('brandName')?.value;

    this.brandService.newBrand(
      brandName,
      this.FileImageLink
    ).subscribe(response => {
      console.log(response)
      if (response.code === 201) {
        this.clearFields(formDirective, this.newBrandForm);
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
