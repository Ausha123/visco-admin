import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShareRoutingModule} from './share-routing.module';
import {ShareComponent} from './share.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {HttpClientModule} from "@angular/common/http";
import {LoadingTypeInnerFullPageSpinnerComponent} from "./components/core/loading/loading-type-inner-full-page-spinner/loading-type-inner-full-page-spinner.component";
import {LoadingTypeInnerFullSpinnerOneComponent} from "./components/core/loading/loading-type-inner-full-spinner-one/loading-type-inner-full-spinner-one.component";
import {LoadingTypeProgressBarComponent} from "./components/core/loading/loading-type-progress-bar/loading-type-progress-bar.component";
import {LoadingTypeProgressSubFourComponent} from "./components/core/loading/loading-type-progress-sub-four/loading-type-progress-sub-four.component";
import {LoadingTypeProgressSubOneComponent} from "./components/core/loading/loading-type-progress-sub-one/loading-type-progress-sub-one.component";
import {LoadingTypeProgressSubThreeComponent} from "./components/core/loading/loading-type-progress-sub-three/loading-type-progress-sub-three.component";
import {LoadingTypeProgressSubTwoComponent} from "./components/core/loading/loading-type-progress-sub-two/loading-type-progress-sub-two.component";
import {LoadingTypeSpinnerComponent} from "./components/core/loading/loading-type-spinner/loading-type-spinner.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    ShareComponent,
    HeaderComponent,
    FooterComponent,
    LoadingTypeInnerFullPageSpinnerComponent,
    LoadingTypeInnerFullSpinnerOneComponent,
    LoadingTypeProgressBarComponent,
    LoadingTypeProgressSubFourComponent,
    LoadingTypeProgressSubOneComponent,
    LoadingTypeProgressSubThreeComponent,
    LoadingTypeProgressSubTwoComponent,
    LoadingTypeSpinnerComponent
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    LoadingTypeProgressSubOneComponent
  ],
  imports: [
    CommonModule,
    ShareRoutingModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ]
})
export class ShareModule {
}
