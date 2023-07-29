import { Component, OnInit } from '@angular/core';
import {SalaryAdvanceService} from "../../../../../../../../../share/service/salaryAdvance/salary-advance.service";

@Component({
  selector: 'app-salary-delete-pop-up',
  templateUrl: './salary-delete-pop-up.component.html',
  styleUrls: ['./salary-delete-pop-up.component.scss']
})
export class SalaryDeletePopUpComponent implements OnInit {

  constructor(private salaryAdvanceService:SalaryAdvanceService) { }

  ngOnInit(): void {
  }

  deleteSalaryAdvance(){
    let object=this.salaryAdvanceService.getObject();
    this.salaryAdvanceService.deleteSalaryAdvance(object.propertyId)
      .subscribe(res=>{
        alert("Delete Salary advance...");
        location.reload();
      },
        error => {
        console.log(error);
        }
        )
  }
}
