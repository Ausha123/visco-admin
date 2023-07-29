import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {HrRoutingModule} from './hr-routing.module';
import {HrComponent} from './hr.component';
import {EmployeeContextComponent} from './components/Employee/employee-context/employee-context.component';
import {AttendanceContextComponent} from './components/attendance/attendance-context/attendance-context.component';
import {SalaryAdvanceContextComponent} from './components/salary-advance/salary-advance-context/salary-advance-context.component';
import {PayrollContextComponent} from './components/payroll/payroll-context/payroll-context.component';
import {CustomerContextComponent} from './components/customer/customer-context/customer-context.component';
import {NewEmployeeContextComponent} from './components/Employee/employee-context/items/new-employee-context/new-employee-context.component';
import {AllEmployeeContextComponent} from './components/Employee/employee-context/items/all-employee-context/all-employee-context.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AllEmployeeComponent} from './components/Employee/employee-context/items/all-employee-context/inner-items/all-employee/all-employee.component';
import {NewEmployeeComponent} from './components/Employee/employee-context/items/new-employee-context/inner-items/new-employee/new-employee.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {EmployeePopUpComponent} from './components/Employee/employee-context/items/pop-up/employee-update-pop-up/employee-pop-up.component';
import {MatDialogModule} from "@angular/material/dialog";
import {EmployeeBottemSheetComponent} from './components/Employee/employee-context/items/bottom-sheet/employee-bottem-sheet/employee-bottem-sheet.component';
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatListModule} from "@angular/material/list";
import {EmployeeDeletePopUpComponent} from './components/Employee/employee-context/items/pop-up/employee-delete-pop-up/employee-delete-pop-up.component';
import {NewAttendanceContextComponent} from './components/attendance/attendance-context/items/new-attendance-context/new-attendance-context.component';
import {AllAttendanceContextComponent} from './components/attendance/attendance-context/items/all-attendance-context/all-attendance-context.component';
import {NewSalaryAdvanceContextComponent} from "./components/salary-advance/salary-advance-context/items/new-salary-advance-context/new-salary-advance-context.component";
import {NewAttendanceComponent} from './components/attendance/attendance-context/items/new-attendance-context/inner-items/new-attendance/new-attendance.component';
import {HistoryAttendanceComponent} from './components/attendance/attendance-context/items/all-attendance-context/inner-items/history-attendance/history-attendance.component';
import {AttendanceBottomSheetComponent} from './components/attendance/attendance-context/items/bottom-sheet/attendance-bottom-sheet/attendance-bottom-sheet.component';
import {AttendanceDeletePopUpComponent} from './components/attendance/attendance-context/items/pop-up/attendance-delete-pop-up/attendance-delete-pop-up.component';
import {HistorySalaryAdvanceContextComponent} from './components/salary-advance/salary-advance-context/items/history-salary-advance-context/history-salary-advance-context.component';
import {NewSalaryAdvanceComponent} from './components/salary-advance/salary-advance-context/items/new-salary-advance-context/inner-items/new-salary-advance/new-salary-advance.component';
import {HistorySalaryAdvanceComponent} from './components/salary-advance/salary-advance-context/items/history-salary-advance-context/inner-items/history-salary-advance/history-salary-advance.component';
import {AdvanceClearanceContextComponent} from './components/salary-advance/salary-advance-context/items/advance-clearance-context/advance-clearance-context.component';
import {AdvanceClearanceHistoryContextComponent} from './components/salary-advance/salary-advance-context/items/advance-clearance-history-context/advance-clearance-history-context.component';
import {AdvanceClearanceComponent} from './components/salary-advance/salary-advance-context/items/advance-clearance-context/inner-items/advance-clearance/advance-clearance.component';
import {AdvanceClearanceHistoryComponent} from './components/salary-advance/salary-advance-context/items/advance-clearance-history-context/inner-items/advance-clearance-history/advance-clearance-history.component';
import {NewCustomerContextComponent} from './components/customer/customer-context/items/new-customer-context/new-customer-context.component';
import {AllCustomerContextComponent} from './components/customer/customer-context/items/all-customer-context/all-customer-context.component';
import {NewCustomerComponent} from './components/customer/customer-context/items/new-customer-context/inner-items/new-customer/new-customer.component';
import {AllCustomerComponent} from './components/customer/customer-context/items/all-customer-context/inner-items/all-customer/all-customer.component';
import {NewPayrollContextComponent} from './components/payroll/payroll-context/items/new-payroll-context/new-payroll-context.component';
import {AllPayrollContextComponent} from './components/payroll/payroll-context/items/all-payroll-context/all-payroll-context.component';
import {NewPayrollComponent} from './components/payroll/payroll-context/items/new-payroll-context/inner-items/new-payroll/new-payroll.component';
import {AllPayrollComponent} from './components/payroll/payroll-context/items/all-payroll-context/inner-items/all-payroll/all-payroll.component';
import { CustomerBottomSheetComponent } from './components/customer/customer-context/items/bottom-sheet/customer-bottom-sheet/customer-bottom-sheet.component';
import { CustomerDeletePopUpComponent } from './components/customer/customer-context/items/pop-up/customer-delete-pop-up/customer-delete-pop-up.component';
import { CustomerUpdatePopUpComponent } from './components/customer/customer-context/items/pop-up/customer-update-pop-up/customer-update-pop-up.component';
import { PayrollBottomSheetComponent } from './components/payroll/payroll-context/items/bottom-sheet/payroll-bottom-sheet/payroll-bottom-sheet.component';
import { PayrollUpdatePopUpComponent } from './components/payroll/payroll-context/items/pop-up/payroll-update-pop-up/payroll-update-pop-up.component';
import { PayrollDeletePopUpComponent } from './components/payroll/payroll-context/items/pop-up/payroll-delete-pop-up/payroll-delete-pop-up.component';
import { SalaryAdvanceBottomSheetComponent } from './components/salary-advance/salary-advance-context/items/salary-advance-bottom-sheet/salary-advance-bottom-sheet.component';
import { SalaryDeletePopUpComponent } from './components/salary-advance/salary-advance-context/items/pop-up/salary-delete-pop-up/salary-delete-pop-up.component';
import { AdvanceClearanceDeletePopUpComponent } from './components/salary-advance/salary-advance-context/items/pop-up/advance-clearance-delete-pop-up/advance-clearance-delete-pop-up.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SalaryUpdatePopUpComponent } from './components/salary-advance/salary-advance-context/items/pop-up/salary-update-pop-up/salary-update-pop-up.component';
import { AdvanceClearanceUpdatePopUpComponent } from './components/salary-advance/salary-advance-context/items/pop-up/advance-clearance-update-pop-up/advance-clearance-update-pop-up.component';
import { NewAdvanceClearancePopUpComponent } from './components/salary-advance/salary-advance-context/items/pop-up/new-advance-clearance-pop-up/new-advance-clearance-pop-up.component';
import { AdvanceClearanceBottomSheetNewComponent } from './components/salary-advance/salary-advance-context/items/advance-clearance-bottom-sheet-new/advance-clearance-bottom-sheet-new.component';


@NgModule({
  declarations: [
    HrComponent,
    EmployeeContextComponent,
    AttendanceContextComponent,
    SalaryAdvanceContextComponent,
    PayrollContextComponent,
    CustomerContextComponent,
    NewEmployeeContextComponent,
    AllEmployeeContextComponent,
    AllEmployeeComponent,
    NewEmployeeComponent,
    EmployeePopUpComponent,
    EmployeeBottemSheetComponent,
    EmployeeDeletePopUpComponent,
    NewAttendanceContextComponent,
    AllAttendanceContextComponent,
    NewAttendanceComponent,
    HistoryAttendanceComponent,
    AttendanceBottomSheetComponent,
    AttendanceDeletePopUpComponent,
    NewSalaryAdvanceContextComponent,
    HistorySalaryAdvanceContextComponent,
    NewSalaryAdvanceComponent,
    HistorySalaryAdvanceComponent,
    AdvanceClearanceContextComponent,
    AdvanceClearanceHistoryContextComponent,
    AdvanceClearanceComponent,
    AdvanceClearanceHistoryComponent,
    NewCustomerContextComponent,
    AllCustomerContextComponent,
    NewCustomerComponent,
    AllCustomerComponent,
    NewPayrollContextComponent,
    AllPayrollContextComponent,
    NewPayrollComponent,
    AllPayrollComponent,
    CustomerBottomSheetComponent,
    CustomerDeletePopUpComponent,
    CustomerUpdatePopUpComponent,
    PayrollBottomSheetComponent,
    PayrollUpdatePopUpComponent,
    PayrollDeletePopUpComponent,
    SalaryAdvanceBottomSheetComponent,
    SalaryDeletePopUpComponent,
    AdvanceClearanceDeletePopUpComponent,
    SalaryUpdatePopUpComponent,
    AdvanceClearanceUpdatePopUpComponent,
    NewAdvanceClearancePopUpComponent,
    AdvanceClearanceBottomSheetNewComponent,

  ],

    imports: [
      CommonModule,
      HrRoutingModule,
      MatFormFieldModule,
      MatDatepickerModule,
      MatSelectModule,
      MatIconModule,
      MatInputModule,
      MatTooltipModule,
      MatTabsModule,
      MatNativeDateModule,
      MatButtonModule,
      MatTableModule,
      MatPaginatorModule,
      MatDialogModule,
      MatBottomSheetModule,
      MatListModule,
      ReactiveFormsModule,
      FormsModule
    ]
  })
  export class HrModule {
  }
