import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../../../../../../../../share/service/customer/customer.service";
import {CommonSnackBarService} from "../../../../../../../../../share/service/core/common-snack-bar-service.service";

@Component({
  selector: 'app-customer-delete-pop-up',
  templateUrl: './customer-delete-pop-up.component.html',
  styleUrls: ['./customer-delete-pop-up.component.scss']
})
export class CustomerDeletePopUpComponent implements OnInit {

  constructor(private customerService:CustomerService,private commonSnackBarService:CommonSnackBarService) { }

  ngOnInit(): void {
  }

  deleteCustomer() {
    let object=this.customerService.getObject();
    let nic=object.nic;
    this.customerService.deleteCustomer(nic)
      .subscribe((res:any)=>{
        // alert("Customer Deleted Successfully...");
          this.openSnackBar(res.message,'close');
          location.reload();
      },
        error => {
          console.log(error);
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
