import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { FinanceComponent } from './finance.component';
import { SpecialDiscountContextComponent } from './components/special-discount/special-discount-context/special-discount-context.component';
import { RentalPaymentContextComponent } from './components/rental-payment/rental-payment-context/rental-payment-context.component';
import { NewRentalPaymentComponent } from './components/rental-payment/rental-payment-context/items/new-rental-payment/new-rental-payment.component';
import { RentalPaymentHistoryComponent } from './components/rental-payment/rental-payment-context/items/rental-payment-history/rental-payment-history.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { NewDiscountComponent } from './components/special-discount/special-discount-context/items/new-discount/new-discount.component';
import { DiscountHistoryComponent } from './components/special-discount/special-discount-context/items/discount-history/discount-history.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import { BottomSheetComponent } from './components/rental-payment/rental-payment-context/items/bottom-sheet/bottom-sheet.component';
import { RentalPaymentDeletePopUpComponent } from './components/rental-payment/rental-payment-context/items/pop-up/rental-payment-delete-pop-up/rental-payment-delete-pop-up.component';
import { RentalPaymentUpdatePopUpComponent } from './components/rental-payment/rental-payment-context/items/pop-up/rental-payment-update-pop-up/rental-payment-update-pop-up.component';
import {MatListModule} from "@angular/material/list";
import {MatDialogModule} from "@angular/material/dialog";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import { SpecialDiscountUpdatePopUpComponent } from './components/special-discount/special-discount-context/items/pop-up/special-discount-update-pop-up/special-discount-update-pop-up.component';
import { SpecialDiscountDeletePopUpComponent } from './components/special-discount/special-discount-context/items/pop-up/special-discount-delete-pop-up/special-discount-delete-pop-up.component';
import { SpecialDiscountBottomSheetComponent } from './components/special-discount/special-discount-context/items/special-discount-bottom-sheet/special-discount-bottom-sheet.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShareModule} from "../../../share/share.module";


@NgModule({
  declarations: [
    FinanceComponent,
    SpecialDiscountContextComponent,
    RentalPaymentContextComponent,
    NewRentalPaymentComponent,
    RentalPaymentHistoryComponent,
    NewDiscountComponent,
    DiscountHistoryComponent,
    BottomSheetComponent,
    RentalPaymentDeletePopUpComponent,
    RentalPaymentUpdatePopUpComponent,
    SpecialDiscountUpdatePopUpComponent,
    SpecialDiscountDeletePopUpComponent,
    SpecialDiscountBottomSheetComponent,


  ],
    imports: [
        CommonModule,
        FinanceRoutingModule,
        MatTabsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatButtonModule,
        MatInputModule,
        MatNativeDateModule,
        MatSelectModule,
        MatIconModule,
        MatTableModule,
        MatListModule,
        MatDialogModule,
        MatBottomSheetModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        FormsModule,
        ShareModule
    ]
})

export class FinanceModule{}
