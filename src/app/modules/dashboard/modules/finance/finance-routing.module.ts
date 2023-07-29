import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceComponent } from './finance.component';
import {RentalPaymentContextComponent} from "./components/rental-payment/rental-payment-context/rental-payment-context.component";
import {SpecialDiscountContextComponent} from "./components/special-discount/special-discount-context/special-discount-context.component";
import {NewRentalPaymentComponent} from "./components/rental-payment/rental-payment-context/items/new-rental-payment/new-rental-payment.component";
import {RentalPaymentHistoryComponent} from "./components/rental-payment/rental-payment-context/items/rental-payment-history/rental-payment-history.component";
import {NewDiscountComponent} from "./components/special-discount/special-discount-context/items/new-discount/new-discount.component";
import {DiscountHistoryComponent} from "./components/special-discount/special-discount-context/items/discount-history/discount-history.component";

const routes: Routes = [
    {
      path: '', component: FinanceComponent,children:[
    {
      path:'rental-payment',component:RentalPaymentContextComponent,children:[
        {path: '',redirectTo:'new-rental-payment',pathMatch:'full'},
          {path:'new-rental-payment',component:NewRentalPaymentComponent},
        {path:'rental-payment-history',component:RentalPaymentHistoryComponent}
      ]},
    {
      path:'special-discount',component:SpecialDiscountContextComponent,children:[
        {path: '',redirectTo:'new-discount',pathMatch: 'full'},
        {path: 'new-discount',component: NewDiscountComponent},
        {path: 'discount-history',component:DiscountHistoryComponent}
      ]
    }
  ]}];






@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})



export class FinanceRoutingModule { }
