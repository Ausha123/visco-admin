import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MainLeftNavBarComponent } from './modules/components/main-left-nav-bar/main-left-nav-bar.component';
import {MatIconModule} from "@angular/material/icon";
import {
  DashBoardHeaderTopBarComponent
} from "./modules/components/dash-board-header-top-bar/dash-board-header-top-bar.component";
import { DashboardContextComponent } from './modules/components/dashboard-context/dashboard-context.component';
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    DashboardComponent,
    DashBoardHeaderTopBarComponent,
    MainLeftNavBarComponent,
    DashboardContextComponent
  ],
  exports: [
    MainLeftNavBarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    MatMenuModule,
  ]
})
export class DashboardModule { }
