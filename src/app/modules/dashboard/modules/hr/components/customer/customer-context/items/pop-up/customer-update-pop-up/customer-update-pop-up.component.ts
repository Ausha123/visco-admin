import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective} from "@angular/forms";
import {CustomerService} from "../../../../../../../../../share/service/customer/customer.service";
import {CommonSnackBarService} from "../../../../../../../../../share/service/core/common-snack-bar-service.service";
import {FileUploadService} from "../../../../../../../../../share/service/file-upload/file-upload.service";

@Component({
  selector: 'app-customer-update-pop-up',
  templateUrl: './customer-update-pop-up.component.html',
  styleUrls: ['./customer-update-pop-up.component.scss']
})
export class CustomerUpdatePopUpComponent implements OnInit {
  private object=this.customerService.getObject();

  fileImageUploadHiddenEverything: string = '';
  FileImageLink: any = '';
  fileImageOverlay: string = '';
  fileName = '';
  fileImageUploadChecker: boolean = true;
  fileImageUploadHiddenEverythingChecker: string = '';
  fileImageOverlayChecker: string = '';



  onFileSelected(event: any) {
    this.FileImageLink='';
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
          console.log(this.FileImageLink)
        }
      }, error1 => {
        console.log(error1)
      })
    }
  }

  constructor(
    private customerService:CustomerService,private commonSnackBarService:CommonSnackBarService,private fileUploadService: FileUploadService) { }

  ngOnInit(): void {

    this.updateCustomerForm.get("nic")?.setValue(this.object.nic);
    this.updateCustomerForm.get("name")?.setValue(this.object.name);
    this.updateCustomerForm.get("contact")?.setValue(this.object.contact);
    this.updateCustomerForm.get("address")?.setValue(this.object.address);
    this.updateCustomerForm.get("regDate")?.setValue(this.object.date);
    this.FileImageLink=this.object.idCopy[0].image;
  }


  updateCustomerForm = new FormGroup({
    nic : new FormControl(),
    name : new FormControl(),
    contact : new FormControl(),
    address : new FormControl(),
    regDate : new FormControl(),
  });

  updateCustomer(formDirective: FormGroupDirective){

    let nic:string = this.updateCustomerForm.get('nic')?.value;
    let name:string = this.updateCustomerForm.get('name')?.value;
    let contact:string = this.updateCustomerForm.get('contact')?.value;
    let address:string = this.updateCustomerForm.get('address')?.value;
    let regDate:string = this.updateCustomerForm.get('regDate')?.value;
    let image:string=this.FileImageLink.toString();

    const data = {
      address: address,
      contact: contact,
      date:regDate,
      idCopy: [
        {image:image}
      ],
      name: name,
      otherData: [
        {}
      ]

    }

    this.customerService.updateCustomer(data,this.object.nic)
      .subscribe((res:any)=>{
        // alert("Customer Updated Successfully...");
          if (res.code === 204) {
            this.openSnackBar(res.message, 'close');
            this.clearFields(formDirective, this.updateCustomerForm);
            location.reload();
          } else {
            this.openSnackBar('Something went wrong try again!', 'close');
          }
      },
        error => {
          console.log(error);
          this.openSnackBar(error.message,'close');
        }
        )
  }

  clearFields(formDirective: FormGroupDirective, form: FormGroup): void {
    form.reset(); // Reset form data
    formDirective.resetForm(); // Reset the ugly validators
  }

  openSnackBar(message: string, action: string) {
    this.commonSnackBarService.trigger(message, action, [
      10000, 'success-snack-bar-common',
      'end',
      'top'
    ]);
  }

}
