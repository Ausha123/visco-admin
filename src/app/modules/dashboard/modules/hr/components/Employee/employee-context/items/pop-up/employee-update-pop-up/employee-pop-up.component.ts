import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../../../../../../../../share/service/employee/employee.service";
import {FormControl, FormGroup} from "@angular/forms";
import {PaymentDataTypeDTO} from "../../../../../../../../../share/data/employee/PaymentDataTypeDTO";
import {PaymentTypesDataSource} from "../../../../../../../../../share/data/employee/PaymentTypesDataSource";
import {GenderDataTypeDTO} from "../../../../../../../../../share/data/employee/genderDataTypeDTO";
import {GenderTypesDataSource} from "../../../../../../../../../share/data/employee/genderTypesDataSource";
import {Router} from "@angular/router";
import {CommonSnackBarService} from "../../../../../../../../../share/service/core/common-snack-bar-service.service";

@Component({
  selector: 'app-employee-pop-up',
  templateUrl: './employee-pop-up.component.html',
  styleUrls: ['./employee-pop-up.component.scss']
})
export class EmployeePopUpComponent implements OnInit {

  url: any; //Angular 11, for stricter type
  msg = "";

  selectFile(event: any) { //Angular 11, for stricter type
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;

      console.log(this.url)
    }
  }

  constructor(private employeeService:EmployeeService,  private commonSnackBarService:CommonSnackBarService) { }
  private object=this.employeeService.getObject();
  payment_types: Array<PaymentDataTypeDTO>=new PaymentTypesDataSource().getAllSources();
  gender_types: Array<GenderDataTypeDTO>=new GenderTypesDataSource().getAllSources();


  ngOnInit(): void {
    this.updateEmployeeForm.get('name')?.setValue(this.object.fullName);
    this.updateEmployeeForm.get('email')?.setValue(this.object.email);
    this.updateEmployeeForm.get('contact')?.setValue(this.object.contact);
    this.updateEmployeeForm.get('address')?.setValue(this.object.address);
    this.updateEmployeeForm.get('nic')?.setValue(this.object.nic);
    this.updateEmployeeForm.get('genderType')?.setValue(this.object.gender);
    this.updateEmployeeForm.get('paymentType')?.setValue(this.object.paymentType);
    this.updateEmployeeForm.get('date')?.setValue(this.object.dob);
    // this.updateEmployeeForm.get('date')?.setValue(this.object.paymentType);
  }
  updateEmployeeForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    contact: new FormControl(),
    address: new FormControl(),
    nic: new FormControl(),
    genderType: new FormControl(),
    paymentType: new FormControl(),
    date: new FormControl(),
    // image: new FormControl(),
  });

  updateEmployee(){
    let name:string = this.updateEmployeeForm.get('name')?.value;
    let email:string = this.updateEmployeeForm.get('email')?.value;
    let contact:string = this.updateEmployeeForm.get('contact')?.value;
    let address:string = this.updateEmployeeForm.get('address')?.value;
    let nic:string = this.updateEmployeeForm.get('nic')?.value;
    let genderType:any = this.updateEmployeeForm.get('genderType')?.value;
    let paymentType:any = this.updateEmployeeForm.get('paymentType')?.value;
    let date:any = this.updateEmployeeForm.get('date')?.value;
    // let image:any = this.updateEmployeeForm.get('image')?.value


    const data = {
      address: address,
      contact: contact,
      dob: date,
      email:email,
      fullName: name,
      gender: genderType,
      nic: nic,
      otherData: [
        {}
      ],
      paymentType: paymentType
    }

    this.employeeService.updateEmployee(data,this.object.propertyId)
      .subscribe((res: any) => {
          console.log(res);
          // alert("Employee updated Successfully...");
          this.openSnackBar(res.message,'close');
          location.reload();
        },
        (error: any) => {
          console.log(error);
          this.openSnackBar(error.message,'close');
        }
      )
  }

  openSnackBar(message: string, action: string) {
    this.commonSnackBarService.trigger(message, action, [
      10000, 'success-snack-bar-common',
      'end',
      'top'
    ]);
  }
}
