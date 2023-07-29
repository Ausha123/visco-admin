import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DailyProcessComponent} from './daily-process.component';
import {ProductContextComponent} from "./components/product/product-context/product-context.component";
import {ProductTypeContextComponent} from "./components/product-type/product-type-context/product-type-context.component";
import {UnitTypeContextComponent} from "./components/unit-type/unit-type-context/unit-type-context.component";
import {BrandContextComponent} from "./components/brand/brand-context/brand-context.component";
import {FuelContextComponent} from "./components/fuel/fuel-context/fuel-context.component";
import {NewFuelTypeComponent} from "./components/fuel/fuel-context/new-fuel-type/new-fuel-type.component";
import {AllFuelTypeComponent} from "./components/fuel/fuel-context/all-fuel-type/all-fuel-type.component";
import {DamagedDetailsContextComponent} from "./components/damaged-details/damaged-details-context/damaged-details-context.component";
import {DamagedHistoryComponent} from "./components/damaged-details/damaged-details-context/damaged-history/damaged-history.component";
import {MaintainDataContextComponent} from "./components/maintain-data/maintain-data-context/maintain-data-context.component";
import {NewMaintainDataComponent} from "./components/maintain-data/maintain-data-context/new-maintain-data/new-maintain-data.component";
import {MaintainHistoryComponent} from "./components/maintain-data/maintain-data-context/maintain-history/maintain-history.component";
import {RentDataContextComponent} from "./components/rent-data/rent-data-context/rent-data-context.component";
import {NewRentDataComponent} from "./components/rent-data/rent-data-context/new-rent-data/new-rent-data.component";
import {RentHistoryComponent} from "./components/rent-data/rent-data-context/rent-history/rent-history.component";
import {CustomerReviewsContextComponent} from "./components/customer-reviews/customer-reviews-context/customer-reviews-context.component";
import {NewProductComponent} from "./components/product/product-context/new-product/new-product.component";
import {AllProductsComponent} from "./components/product/product-context/all-products/all-products.component";
import {NewProductTypeComponent} from "./components/product-type/product-type-context/new-product-type/new-product-type.component";
import {AllProductTypeComponent} from "./components/product-type/product-type-context/all-product-type/all-product-type.component";
import {NewUnitTypeComponent} from "./components/unit-type/unit-type-context/new-unit-type/new-unit-type.component";
import {AllUnitTypeComponent} from "./components/unit-type/unit-type-context/all-unit-type/all-unit-type.component";
import {NewBrandComponent} from "./components/brand/brand-context/new-brand/new-brand.component";
import {AllBrandComponent} from "./components/brand/brand-context/all-brand/all-brand.component";
import {AllCustomerReviewsComponent} from "./components/customer-reviews/customer-reviews-context/all-customer-reviews/all-customer-reviews.component";

const routes: Routes = [
  {
    path: '', component: DailyProcessComponent, children: [
      {
        path: 'product', component: ProductContextComponent, children: [
          {path: '', redirectTo: '/new-product', pathMatch: 'full'},
          {path: 'new-product', component: NewProductComponent},
          {path: 'all-products', component: AllProductsComponent}
        ]
      },
      {
        path: 'product-type', component: ProductTypeContextComponent, children: [
          {path: '', redirectTo: 'new-product-type', pathMatch: 'full'},
          {path: 'new-product-type', component: NewProductTypeComponent},
          {path: 'all-product-types', component: AllProductTypeComponent}
        ]
      },
      {
        path: 'unit-type', component: UnitTypeContextComponent, children: [
          {path: '', redirectTo: 'new-unit-type', pathMatch: 'full'},
          {path: 'new-unit-type', component: NewUnitTypeComponent},
          {path: 'all-unit-types', component: AllUnitTypeComponent}
        ]
      },
      {
        path: 'brand', component: BrandContextComponent, children: [
          {path: '', redirectTo: 'new-brand', pathMatch: 'full'},
          {path: 'new-brand', component: NewBrandComponent},
          {path: 'all-brands', component: AllBrandComponent}
        ]
      },
      {
        path: 'fuel-type', component: FuelContextComponent, children: [
          {path: '', redirectTo: 'new-fuel-type', pathMatch: 'full'},
          {path: 'new-fuel-type', component: NewFuelTypeComponent},
          {path: 'all-fuel-types', component: AllFuelTypeComponent}
        ]
      },
      {
        path: 'damage-detail', component: DamagedDetailsContextComponent, children: [
          {path: '', redirectTo: 'damage-details-history', pathMatch: 'full'},
          {path: 'damage-details-history', component: DamagedHistoryComponent}
        ]
      },
      {
        path: 'maintain-data', component: MaintainDataContextComponent, children: [
          {path: '', redirectTo: 'new-maintain-data', pathMatch: 'full'},
          {path: 'new-maintain-data', component: NewMaintainDataComponent},
          {path: 'maintain-data-history', component: MaintainHistoryComponent}
        ]
      },
      {
        path: 'rent-data', component: RentDataContextComponent, children: [
          {path: '', redirectTo: 'new-rent-data', pathMatch: 'full'},
          {path: 'new-rent-data', component: NewRentDataComponent},
          {path: 'rent-data-history', component: RentHistoryComponent}
        ]
      },
      {
        path: 'customer-reviews', component: CustomerReviewsContextComponent, children: [
          {path: '', redirectTo: 'all-customer-reviews', pathMatch: 'full'},
          {path: 'all-customer-reviews', component: AllCustomerReviewsComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyProcessRoutingModule {
}
