import { Component, OnInit } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {EmployeePopUpComponent} from "../../../pop-up/employee-update-pop-up/employee-pop-up.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {EmployeeBottemSheetComponent} from "../../../bottom-sheet/employee-bottem-sheet/employee-bottem-sheet.component";
import {EmployeeService} from "../../../../../../../../../../share/service/employee/employee.service";
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs";





@Component({
  selector: 'app-all-employee',
  templateUrl: './all-employee.component.html',
  styleUrls: ['./all-employee.component.scss']
})



export class AllEmployeeComponent implements OnInit {


  constructor(private dialog: MatDialog,private bottomSheet: MatBottomSheet,
              private employeeService:EmployeeService
              ) { }

  page: number | undefined = 0;
  pageSize: number | undefined = 10;
  pageSizeOptions = [5, 10, 20, 30, 50, 80, 100];
  dataCount = 0;
  pageEvent: PageEvent | undefined;
  activeState = 'all';
  searchText = '';
  allEmployee:any=[];

  searchForm = new FormGroup({
    searchText: new FormControl(null),
  });


  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        this.searchText = data.searchText;
        this.getAllEmployee();
      });
  }


  manage(object:any) {
    this.bottomSheet.open(EmployeeBottemSheetComponent);
    this.employeeService.setObject(object);
  }

  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    console.log(event);
    this.getAllEmployee();
  }


  public getAllEmployee(){



    this.allEmployee=[];
    this.employeeService.getAllEmployee(this.activeState,this.page,this.pageSize,this.searchText)
      .subscribe((res:any)=>{
        this.dataCount=res.data.dataCount;
        this.allEmployee=res.data.list;
      },
      error => {
        console.log(error);
      }
      )
  }
}

