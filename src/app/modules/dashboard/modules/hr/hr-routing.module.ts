import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HrComponent} from './hr.component';
import {EmployeeContextComponent} from "./components/Employee/employee-context/employee-context.component";
import {NewEmployeeContextComponent} from "./components/Employee/employee-context/items/new-employee-context/new-employee-context.component";
import {AllEmployeeContextComponent} from "./components/Employee/employee-context/items/all-employee-context/all-employee-context.component";
import {AllEmployeeComponent} from "./components/Employee/employee-context/items/all-employee-context/inner-items/all-employee/all-employee.component";
import {NewEmployeeComponent} from "./components/Employee/employee-context/items/new-employee-context/inner-items/new-employee/new-employee.component";
import {AttendanceContextComponent} from "./components/attendance/attendance-context/attendance-context.component";
import {NewAttendanceContextComponent} from "./components/attendance/attendance-context/items/new-attendance-context/new-attendance-context.component";
import {AllAttendanceContextComponent} from "./components/attendance/attendance-context/items/all-attendance-context/all-attendance-context.component";
import {NewAttendanceComponent} from "./components/attendance/attendance-context/items/new-attendance-context/inner-items/new-attendance/new-attendance.component";
import {HistoryAttendanceComponent} from "./components/attendance/attendance-context/items/all-attendance-context/inner-items/history-attendance/history-attendance.component";
import {SalaryAdvanceContextComponent} from "./components/salary-advance/salary-advance-context/salary-advance-context.component";
import {NewSalaryAdvanceContextComponent} from "./components/salary-advance/salary-advance-context/items/new-salary-advance-context/new-salary-advance-context.component";
import {HistorySalaryAdvanceContextComponent} from "./components/salary-advance/salary-advance-context/items/history-salary-advance-context/history-salary-advance-context.component";
import {NewSalaryAdvanceComponent} from "./components/salary-advance/salary-advance-context/items/new-salary-advance-context/inner-items/new-salary-advance/new-salary-advance.component";
import {HistorySalaryAdvanceComponent} from "./components/salary-advance/salary-advance-context/items/history-salary-advance-context/inner-items/history-salary-advance/history-salary-advance.component";
import {AdvanceClearanceContextComponent} from "./components/salary-advance/salary-advance-context/items/advance-clearance-context/advance-clearance-context.component";
import {AdvanceClearanceHistoryContextComponent} from "./components/salary-advance/salary-advance-context/items/advance-clearance-history-context/advance-clearance-history-context.component";
import {AdvanceClearanceComponent} from "./components/salary-advance/salary-advance-context/items/advance-clearance-context/inner-items/advance-clearance/advance-clearance.component";
import {AdvanceClearanceHistoryComponent} from "./components/salary-advance/salary-advance-context/items/advance-clearance-history-context/inner-items/advance-clearance-history/advance-clearance-history.component";
import {CustomerContextComponent} from "./components/customer/customer-context/customer-context.component";
import {NewCustomerContextComponent} from "./components/customer/customer-context/items/new-customer-context/new-customer-context.component";
import {AllCustomerContextComponent} from "./components/customer/customer-context/items/all-customer-context/all-customer-context.component";
import {NewCustomerComponent} from "./components/customer/customer-context/items/new-customer-context/inner-items/new-customer/new-customer.component";
import {AllCustomerComponent} from "./components/customer/customer-context/items/all-customer-context/inner-items/all-customer/all-customer.component";
import {PayrollContextComponent} from "./components/payroll/payroll-context/payroll-context.component";
import {NewPayrollContextComponent} from "./components/payroll/payroll-context/items/new-payroll-context/new-payroll-context.component";
import {AllPayrollContextComponent} from "./components/payroll/payroll-context/items/all-payroll-context/all-payroll-context.component";
import {NewPayrollComponent} from "./components/payroll/payroll-context/items/new-payroll-context/inner-items/new-payroll/new-payroll.component";
import {AllPayrollComponent} from "./components/payroll/payroll-context/items/all-payroll-context/inner-items/all-payroll/all-payroll.component";

const routes: Routes = [
  {
    path: '', component: HrComponent, children: [
      {
        path: 'employee', component: EmployeeContextComponent,children:[
          {path:'newEmployee',component:NewEmployeeContextComponent,
            children:[
              {path: '', redirectTo:'employeeNew', pathMatch: 'full'},
              {path: 'employeeNew', component:NewEmployeeComponent},
            ]},
          {path:'allEmployee',component:AllEmployeeContextComponent,children:[
              {path: '', redirectTo: 'list', pathMatch: 'full'},
              {path: 'list', component:AllEmployeeComponent},
            ]}
       ]
      },
      {
        path:'attendance',component:AttendanceContextComponent,children:[
          {path:'newAttendance',component:NewAttendanceContextComponent,
            children:[
              {path: '', redirectTo:'attendanceNew', pathMatch: 'full'},
              {path: 'attendanceNew', component: NewAttendanceComponent},
            ]},
          {path:'allAttendance',component:AllAttendanceContextComponent,
            children:[
              {path: '', redirectTo:'historyAttendance', pathMatch: 'full'},
              {path: 'historyAttendance', component: HistoryAttendanceComponent},
            ]
          }
        ]
      },
      {
        path:'salary-advance',component:SalaryAdvanceContextComponent,children:[
          {path:'newSalary',component: NewSalaryAdvanceContextComponent,
            children:[
              {path: '', redirectTo:'NewSalaryAdvance', pathMatch: 'full'},
              {path: 'NewSalaryAdvance', component: NewSalaryAdvanceComponent},
            ]
          },
          {path:'historySalary',component: HistorySalaryAdvanceContextComponent,
            children:[
              {path: '', redirectTo:'HistorySalaryAdvance', pathMatch: 'full'},
              {path: 'HistorySalaryAdvance', component: HistorySalaryAdvanceComponent},
            ]
          },
          {path:'advanceClearance',component: AdvanceClearanceContextComponent,
            children:[
              {path: '', redirectTo:'salaryAdvanceClearance', pathMatch: 'full'},
              {path: 'salaryAdvanceClearance', component: AdvanceClearanceComponent},
            ]
          },
          {path:'advanceClearanceHistory',component: AdvanceClearanceHistoryContextComponent,
            children:[
              {path: '', redirectTo:'HistorySalaryAdvanceClearance', pathMatch: 'full'},
              {path: 'HistorySalaryAdvanceClearance', component: AdvanceClearanceHistoryComponent},
            ]
          }

        ]
      },
      {path:'customer',component:CustomerContextComponent,children:[
          {path:'newCustomer',component:NewCustomerContextComponent,
            children:[
              {path: '', redirectTo:'newCustomer', pathMatch: 'full'},
              {path: 'newCustomer', component: NewCustomerComponent},
            ]
          },
          {path:'AllCustomer',component:AllCustomerContextComponent,
            children:[
              {path: '', redirectTo:'allCustomer', pathMatch: 'full'},
              {path: 'allCustomer', component: AllCustomerComponent},
            ]
          },
        ]},
      {path:'payroll',component: PayrollContextComponent,children:[
          {path:'newPayroll',component:NewPayrollContextComponent,
            children:[
              {path: '', redirectTo:'PayrollNew', pathMatch: 'full'},
              {path: 'PayrollNew', component: NewPayrollComponent},
            ]},
          {path:'allPayroll',component:AllPayrollContextComponent,
            children:[
              {path: '', redirectTo:'PayrollAll', pathMatch: 'full'},
              {path: 'PayrollAll', component:AllPayrollComponent},
            ]
          }
        ]}
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule {
}
