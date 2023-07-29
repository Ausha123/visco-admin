import { Component, OnInit } from '@angular/core';
import {PayableDataTypeDTO} from "../../../../../../../../../../share/data/rental-payment/PaybleDataTypeDTO";
import {PayableTypesDataSource} from "../../../../../../../../../../share/data/rental-payment/PaybleTypesDataSource";
import {GenderDataTypeDTO} from "../../../../../../../../../../share/data/employee/genderDataTypeDTO";
import {GenderTypesDataSource} from "../../../../../../../../../../share/data/employee/genderTypesDataSource";
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {PaymentDataTypeDTO} from "../../../../../../../../../../share/data/employee/PaymentDataTypeDTO";
import {PaymentTypesDataSource} from "../../../../../../../../../../share/data/employee/PaymentTypesDataSource";
import {EmployeeService} from "../../../../../../../../../../share/service/employee/employee.service";
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";
import {FileUploadService} from "../../../../../../../../../../share/service/file-upload/file-upload.service";

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {

  filesToUpload: Array<File> = [];
  urls = new Array<string>();
  FileImageLink: any;
  fileImageUploadChecker: boolean = true;
  fileImageUploadHiddenEverythingChecker: string = '';
  fileImageUploadHiddenEverything: string = '';
  fileImageOverlay: string = '';
  fileImageOverlayChecker: string = '';
  private date=new Date()
  fileName = '';

  onFileSelected(event: any) {
    console.log(event);
    let file:File = event.target.files[0];
    if (file) {
      console.log(file)
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('file', file);
      this.fileUploadService.upload(formData).subscribe(response => {
        this.FileImageLink = response;
        console.log(this.FileImageLink);
        this.fileImageUploadChecker = false;
        if (this.fileImageUploadChecker == false){
          this.fileImageUploadHiddenEverythingChecker = 'none';
          this.fileImageUploadHiddenEverything = this.fileImageUploadHiddenEverythingChecker;
          this.fileImageOverlayChecker = 'rgba(201, 201, 201, 0.6)'
        }
      },error1 => {
        console.log(error1)
      })
    }
  }
  /////////////////////////////////////////////



  constructor(private employeeService:EmployeeService,private commonSnackBarService:CommonSnackBarService,
              private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }


  payment_types: Array<PaymentDataTypeDTO>=new PaymentTypesDataSource().getAllSources();
  gender_types: Array<GenderDataTypeDTO>=new GenderTypesDataSource().getAllSources();

  newEmployeeForm = new FormGroup({
    name: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    email: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    contact: new FormControl(null,
      [Validators.required,
        Validators.maxLength(100),
        Validators.pattern(('^(?:0|94|\\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$'))
      ]),
    address: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    nic: new FormControl(null,
      [Validators.required,
        Validators.maxLength(20),
        Validators.pattern('(?:19|20)?\\d{3}[0-9]{8}|[0-9]{9}[x|X|v|V]'),
      ]),
    genderType: new FormControl(null,
      Validators.required),
    paymentType: new FormControl(null,
      Validators.required),
    date:  new FormControl(this.date,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    image: new FormControl(),
  });

  private image: any = [];

  addEmployee(formDirective:FormGroupDirective){
    let name:string = this.newEmployeeForm.get('name')?.value;
    let email:string = this.newEmployeeForm.get('email')?.value;
    let contact:string = this.newEmployeeForm.get('contact')?.value;
    let address:string = this.newEmployeeForm.get('address')?.value;
    let nic:string = this.newEmployeeForm.get('nic')?.value;
    let genderType:any = this.newEmployeeForm.get('genderType')?.value;
    let paymentType:any = this.newEmployeeForm.get('paymentType')?.value;
    let date:any = this.newEmployeeForm.get('date')?.value;
    let image:any = this.newEmployeeForm.get('image')?.value


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

    this.employeeService.saveEmployee(data)
      .subscribe((res: any) => {
          let s = res.message.substring(0,11);
          if (res.code === 201) {
            this.clearFields(formDirective, this.newEmployeeForm);
            this.openSnackBar(res.message, 'close');
          } else {
            this.openSnackBar('Something went wrong try again!', 'close');
          }
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

  clearFields(formDirective: FormGroupDirective, form: FormGroup): void {
    form.reset(); // Reset form data
    formDirective.resetForm(); // Reset the ugly validators
  }

}
