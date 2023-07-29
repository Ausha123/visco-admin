import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DailyProcessRoutingModule} from './daily-process-routing.module';
import {DailyProcessComponent} from './daily-process.component';
import {ProductContextComponent} from './components/product/product-context/product-context.component';
import {UnitTypeContextComponent} from './components/unit-type/unit-type-context/unit-type-context.component';
import {ProductTypeContextComponent} from './components/product-type/product-type-context/product-type-context.component';
import {BrandContextComponent} from './components/brand/brand-context/brand-context.component';
import {FuelContextComponent} from './components/fuel/fuel-context/fuel-context.component';
import {MaintainDataContextComponent} from './components/maintain-data/maintain-data-context/maintain-data-context.component';
import {CustomerReviewsContextComponent} from './components/customer-reviews/customer-reviews-context/customer-reviews-context.component';
import {RentDataContextComponent} from './components/rent-data/rent-data-context/rent-data-context.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import {NewFuelTypeComponent} from './components/fuel/fuel-context/new-fuel-type/new-fuel-type.component';
import {AllFuelTypeComponent} from './components/fuel/fuel-context/all-fuel-type/all-fuel-type.component';
import {NewRentDataComponent} from './components/rent-data/rent-data-context/new-rent-data/new-rent-data.component';
import {NewMaintainDataComponent} from './components/maintain-data/maintain-data-context/new-maintain-data/new-maintain-data.component';
import {RentHistoryComponent} from './components/rent-data/rent-data-context/rent-history/rent-history.component';
import {MaintainHistoryComponent} from './components/maintain-data/maintain-data-context/maintain-history/maintain-history.component';
import {DamagedDetailsContextComponent} from "./components/damaged-details/damaged-details-context/damaged-details-context.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AllCustomerReviewsComponent} from './components/customer-reviews/customer-reviews-context/all-customer-reviews/all-customer-reviews.component';
import {DamageDetailsBottomSheetComponent} from './components/damaged-details/damaged-details-context/damaged-history/inner-items/bottom-sheet/damage-details-bottom-sheet/damage-details-bottom-sheet.component';
import {UpdateDamageDetailsPopUpComponent} from './components/damaged-details/damaged-details-context/damaged-history/inner-items/pop-up/update-damage-details-pop-up/update-damage-details-pop-up.component';
import {DeleteDamageDetailsPopUpComponent} from './components/damaged-details/damaged-details-context/damaged-history/inner-items/pop-up/delete-damage-details-pop-up/delete-damage-details-pop-up.component';
import {FuelTypeBottomSheetComponent} from './components/fuel/fuel-context/all-fuel-type/inner-items/bottom-sheet/fuel-type-bottom-sheet/fuel-type-bottom-sheet.component';
import {UpdateFuelTypePopUpComponent} from './components/fuel/fuel-context/all-fuel-type/inner-items/pop-up/update-fuel-type-pop-up/update-fuel-type-pop-up.component';
import {DeleteFuelTypePopUpComponent} from './components/fuel/fuel-context/all-fuel-type/inner-items/pop-up/delete-fuel-type-pop-up/delete-fuel-type-pop-up.component';
import {MaintainDataBottomSheetComponent} from './components/maintain-data/maintain-data-context/maintain-history/inner-items/bottom-sheet/maintain-data-bottom-sheet/maintain-data-bottom-sheet.component';
import {UpdateMaintainDataPopUpComponent} from './components/maintain-data/maintain-data-context/maintain-history/inner-items/pop-up/update-maintain-data-pop-up/update-maintain-data-pop-up.component';
import {DeleteMaintainDataPopUpComponent} from './components/maintain-data/maintain-data-context/maintain-history/inner-items/pop-up/delete-maintain-data-pop-up/delete-maintain-data-pop-up.component';
import {RentDataBottomSheetComponent} from './components/rent-data/rent-data-context/rent-history/inner-items/bottom-sheet/rent-data-bottom-sheet/rent-data-bottom-sheet.component';
import {UpdateRentDataPopUpComponent} from './components/rent-data/rent-data-context/rent-history/inner-items/pop-up/update-rent-data-pop-up/update-rent-data-pop-up.component';
import {DeleteRentDataPopUpComponent} from './components/rent-data/rent-data-context/rent-history/inner-items/pop-up/delete-rent-data-pop-up/delete-rent-data-pop-up.component';
import {NewUnitTypeComponent} from "./components/unit-type/unit-type-context/new-unit-type/new-unit-type.component";
import {AllProductsComponent} from "./components/product/product-context/all-products/all-products.component";
import {NewProductComponent} from "./components/product/product-context/new-product/new-product.component";
import {ManageProductDataBottomSheetComponent} from "./components/product/product-context/all-products/inner-items/bottom-sheet/manage-product-data-bottom-sheet/manage-product-data-bottom-sheet.component";
import {ProductUpdatePopUpComponent} from "./components/product/product-context/all-products/inner-items/pop-up/product-update-pop-up/product-update-pop-up.component";
import {UnitTypeUpdatePopUpComponent} from "./components/unit-type/unit-type-context/all-unit-type/inner-items/pop-up/unit-type-update-pop-up/unit-type-update-pop-up.component";
import {ProductDeletePopUpComponent} from "./components/product/product-context/all-products/inner-items/pop-up/product-delete-pop-up/product-delete-pop-up.component";
import {ManageUnitTypeDataBottomSheetComponent} from "./components/unit-type/unit-type-context/all-unit-type/inner-items/bottom-sheet/manage-unit-type-data-bottom-sheet/manage-unit-type-data-bottom-sheet.component";
import {UnitTypeDeletePopUpComponent} from "./components/unit-type/unit-type-context/all-unit-type/inner-items/pop-up/unit-type-delete-pop-up/unit-type-delete-pop-up.component";
import {ManageProductTypeDataBottomSheetComponent} from "./components/product-type/product-type-context/all-product-type/inner-items/bottom-sheet/manage-product-type-data-bottom-sheet/manage-product-type-data-bottom-sheet.component";
import {ManageBrandBottomSheetComponent} from "./components/brand/brand-context/all-brand/inner-items/brand-bottom-sheet/manage-brand-bottom-sheet/manage-brand-bottom-sheet.component";
import {ProductTypeDeletePopUpComponent} from "./components/product-type/product-type-context/all-product-type/inner-items/pop-up/product-type-delete-pop-up/product-type-delete-pop-up.component";
import {ProductTypeUpdatePopUpComponent} from "./components/product-type/product-type-context/all-product-type/inner-items/pop-up/product-type-update-pop-up/product-type-update-pop-up.component";
import {BrandUpdatePopUpComponent} from "./components/brand/brand-context/all-brand/inner-items/brand-pop-up/brand-update-pop-up/brand-update-pop-up.component";
import {BrandDeletePopUpComponent} from "./components/brand/brand-context/all-brand/inner-items/brand-pop-up/brand-delete-pop-up/brand-delete-pop-up.component";
import {AllUnitTypeComponent} from "./components/unit-type/unit-type-context/all-unit-type/all-unit-type.component";
import {AllBrandComponent} from "./components/brand/brand-context/all-brand/all-brand.component";
import {NewBrandComponent} from "./components/brand/brand-context/new-brand/new-brand.component";
import {NewProductTypeComponent} from "./components/product-type/product-type-context/new-product-type/new-product-type.component";
import {AllProductTypeComponent} from "./components/product-type/product-type-context/all-product-type/all-product-type.component";
import {NewDamagedDataComponent} from "./components/rent-data/rent-data-context/rent-history/inner-items/pop-up/new-damaged-data/new-damaged-data.component";
import {DamagedHistoryComponent} from "./components/damaged-details/damaged-details-context/damaged-history/damaged-history.component";
import {DashboardModule} from "../../dashboard.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatNativeDateModule} from "@angular/material/core";
import { ViewRentDataPopUpComponent } from './components/rent-data/rent-data-context/rent-history/inner-items/pop-up/view-rent-data-pop-up/view-rent-data-pop-up.component';
import {ShareModule} from "../../../share/share.module";

@NgModule({
  declarations: [
    DailyProcessComponent,
    ProductContextComponent,
    UnitTypeContextComponent,
    ProductTypeContextComponent,
    BrandContextComponent,
    FuelContextComponent,
    MaintainDataContextComponent,
    CustomerReviewsContextComponent,
    RentDataContextComponent,
    DamagedDetailsContextComponent,
    NewProductComponent,
    AllProductsComponent,
    NewUnitTypeComponent,
    AllUnitTypeComponent,
    AllProductTypeComponent,
    NewProductTypeComponent,
    NewBrandComponent,
    AllBrandComponent,
    NewFuelTypeComponent,
    AllFuelTypeComponent,
    NewRentDataComponent,
    NewMaintainDataComponent,
    RentHistoryComponent,
    MaintainHistoryComponent,
    ManageProductDataBottomSheetComponent,
    ProductUpdatePopUpComponent,
    ProductDeletePopUpComponent,
    ManageUnitTypeDataBottomSheetComponent,
    UnitTypeUpdatePopUpComponent,
    UnitTypeDeletePopUpComponent,
    ManageProductTypeDataBottomSheetComponent,
    ProductTypeUpdatePopUpComponent,
    ProductTypeDeletePopUpComponent,
    ManageBrandBottomSheetComponent,
    BrandUpdatePopUpComponent,
    BrandDeletePopUpComponent,
    AllCustomerReviewsComponent,
    DamageDetailsBottomSheetComponent,
    UpdateDamageDetailsPopUpComponent,
    DeleteDamageDetailsPopUpComponent,
    FuelTypeBottomSheetComponent,
    UpdateFuelTypePopUpComponent,
    DeleteFuelTypePopUpComponent,
    MaintainDataBottomSheetComponent,
    UpdateMaintainDataPopUpComponent,
    DeleteMaintainDataPopUpComponent,
    RentDataBottomSheetComponent,
    UpdateRentDataPopUpComponent,
    DeleteRentDataPopUpComponent,
    NewDamagedDataComponent,
    DamagedHistoryComponent,
    ViewRentDataPopUpComponent
  ],
    imports: [
        CommonModule,
        DailyProcessRoutingModule,
        MatButtonModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule,
        MatBottomSheetModule,
        MatListModule,
        MatIconModule,
        MatDialogModule,
        MatTooltipModule,
        DashboardModule,
        FormsModule,
        ReactiveFormsModule,
        DragDropModule,
        MatNativeDateModule,
        ShareModule
    ],

})
export class DailyProcessModule {
}
