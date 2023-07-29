import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {CustomerService} from "../../../../../../../../../../share/service/customer/customer.service";
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";
import {FileUploadService} from "../../../../../../../../../../share/service/file-upload/file-upload.service";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {


  fileImageUploadHiddenEverything: string = '';
  FileImageLink: any = '';
  fileImageOverlay: string = '';
  fileName = '';
  fileImageUploadChecker: boolean = true;
  fileImageUploadHiddenEverythingChecker: string = '';
  fileImageOverlayChecker: string = '';

  private date=new Date()


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
          // console.log(this.FileImageLink)
        }
      }, error1 => {
        console.log(error1)
      })
    }
  }

  newCustomerForm = new FormGroup({
    nic : new FormControl(null,
      [Validators.required,
        Validators.maxLength(20),
        Validators.pattern('(?:19|20)?\\d{3}[0-9]{8}|[0-9]{9}[x|X|v|V]'),
      ]),
    name : new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    contact : new FormControl(null,
      [Validators.required,
        Validators.maxLength(100),
        Validators.pattern(('^(?:0|94|\\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$'))
      ]),
    address : new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    regDate :new FormControl(this.date,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    imageSelect : new FormControl(),
  });

  constructor(private customerService:CustomerService,private commonSnackBarService:CommonSnackBarService,
              private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }


  addCustomer(formDirective:FormGroupDirective){
    let nic:string = this.newCustomerForm.get('nic')?.value;
    let name:string = this.newCustomerForm.get('name')?.value;
    let contact:string = this.newCustomerForm.get('contact')?.value;
    let address:string = this.newCustomerForm.get('address')?.value;
    let regDate:string = this.newCustomerForm.get('regDate')?.value;
    let image:string=this.FileImageLink.toString();
    console.log("This is image link: "+image);

    const data = {
      nic : nic,
      name : name,
      contact : contact,
      idCopy: [
        {image:image}
      ],
      address : address,
      date : regDate,

    }

    this.customerService.saveCustomer(data)
      .subscribe((res: any) => {
          console.log(res);
          // alert("Customer save Successfully...");
          if (res.code === 201) {
            this.clearFields(formDirective, this.newCustomerForm);
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
