import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {DashboardContextComponent} from "./modules/components/dashboard-context/dashboard-context.component";

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {
        path: 'access', component: DashboardContextComponent, children: [
          {path: 'daily-process', loadChildren: () => import('./modules/daily-process/daily-process.module').then(m => m.DailyProcessModule)
          },
          {
            path: 'hr', loadChildren: () => import('./modules/hr/hr.module').then(m => m.HrModule)
          },
          {
            path: 'finance', loadChildren: () => import('./modules/finance/finance.module').then(m => m.FinanceModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
