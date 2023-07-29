import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ManageProductDataBottomSheetComponent} from "./inner-items/bottom-sheet/manage-product-data-bottom-sheet/manage-product-data-bottom-sheet.component";
import {ProductService} from "../../../../../../../share/service/product/product.service";
import {CommonSnackBarService} from "../../../../../../../share/service/core/common-snack-bar-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  allProductsArray: Array<any> = [];

  page: number | undefined = 0;
  pageSize: number | undefined = 10;
  pageSizeOptions = [5, 10, 20, 30, 50, 80, 100];
  dataCount = 0;
  pageEvent: PageEvent | undefined;

  activeState = 'active';
  searchText = '';
  productAvailability = 'all';
  extraStateType = 'REGULAR';

  availability: string[] = ['All', 'Available', 'Unavailable'];
  extraState: string[] = ['REGULAR', 'TOP_PRODUCT', 'NEW_ARRIVAL', 'FEATURED', 'TOP_RATED', 'NEW_ITEMS', 'HAND_TOOLS', 'BEST_SELLER_ONE', 'BEST_SELLER_TWO'];

  searchForm = new FormGroup({
    searchText: new FormControl(''),
    productAvailability: new FormControl(null,
      [Validators.required]),
    extraState: new FormControl(null,
      [Validators.required
      ])

  });

  constructor(
    private _bottomSheet: MatBottomSheet,
    private productService: ProductService,
    private commonSnackBarService: CommonSnackBarService
  ) {
  }

  valueGetter(value: any) {
    this.productAvailability = value;
    this.loadAllProducts();
  }

  ExtraStateGetter(value: any) {
    this.extraStateType = value;
    console.log(this.extraStateType)
    this.loadAllProducts();
  }


  ngOnInit(): void {
    this.loadAllProducts();

    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        this.searchText = data.searchText;
        console.log(this.searchText)
        this.loadAllProducts();
      });

  }

  openBottomSheet(product: any): void {
    console.log(product.availability)
    this._bottomSheet.open(ManageProductDataBottomSheetComponent, {
      panelClass: ['common-bottom-sheet'],
      data: product
    });
    this.loadAllProducts()
  }

  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    console.log(event);
    this.loadAllProducts();
  }


  private loadAllProducts() {
    this.productService.getAllBySearchText(this.page, this.pageSize, this.searchText, this.productAvailability, this.extraStateType).subscribe(response => {
      this.allProductsArray = response.data.list;
      this.dataCount = response.data.dataCount;
      console.log(response)
    }, error => {
      console.log(error);
        this.commonSnackBarService.warningSnackBar(
        'Something went wrong! please try again a while later.',
        'close',
        [5000, 'warning-snack-bar-common']
      );
    })
  }
}
