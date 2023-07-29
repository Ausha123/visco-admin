import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";
import {ProductService} from "../../../../../../../../../../share/service/product/product.service";
import {UnitTypeService} from "../../../../../../../../../../share/service/unit-type/unit-type.service";
import {ProductTypeService} from "../../../../../../../../../../share/service/product-type/product-type.service";
import {BrandService} from "../../../../../../../../../../share/service/Brand/brand.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FileUploadService} from "../../../../../../../../../../share/service/file-upload/file-upload.service";

@Component({
  selector: 'app-product-update-pop-up',
  templateUrl: './product-update-pop-up.component.html',
  styleUrls: ['./product-update-pop-up.component.scss']
})
export class ProductUpdatePopUpComponent implements OnInit {

  unitTypes: Array<any> = [];
  productTypes: Array<any> = [];
  brands: Array<any> = [];
  extraState: string[] = ['REGULAR', 'TOP_PRODUCT', 'NEW_ARRIVAL', 'FEATURED', 'TOP_RATED'];
  availability: string[] = ['Available', 'Unavailable'];
  fileImageUploadHiddenEverything: string = '';
  FileImageLink: any;
  fileImageOverlay: string = '';
  fileName = '';
  fileImageUploadChecker: boolean = true;
  fileImageUploadHiddenEverythingChecker: string = '';
  fileImageOverlayChecker: string = '';

  updateProductForm = new FormGroup({
    productName: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    displayName: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    serial: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    brand: new FormControl(null,
      [Validators.required
      ]),
    extraState: new FormControl(null,
      [Validators.required
      ]),
    availability: new FormControl(null,
      [Validators.required
      ]),
    availableUnits: new FormControl(null,
      [Validators.required
      ]),
    hourlyCost: new FormControl(null,
      [Validators.required
      ]),
    extraNote: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255)
      ]),
    productGuideline: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255)
      ])
  });

  constructor(
    private productTypeService: ProductTypeService,
    private unitTypeService: UnitTypeService,
    private brandService: BrandService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public product: any,
    private commonSnackBarService: CommonSnackBarService,
    private fileUploadService: FileUploadService
  ) {
  }

  ngOnInit(): void {

    this.loadProductData();
    this.loadAllUnitTypes();
    this.loadAllProductTypes();
    this.loadAllBrands();
  }

  updateData(formDirective: FormGroupDirective) {
    let productName = this.updateProductForm.get('productName')?.value;
    let displayName = this.updateProductForm.get('displayName')?.value;
    let serial = this.updateProductForm.get('serial')?.value;
    let brand = this.updateProductForm.get('brand')?.value;
    let extraState = this.updateProductForm.get('extraState')?.value;
    let availability = this.updateProductForm.get('availability')?.value;
    let availableUnits = this.updateProductForm.get('availableUnits')?.value;
    let hourlyCost = this.updateProductForm.get('hourlyCost')?.value;
    let extraNote = this.updateProductForm.get('extraNote')?.value;
    let productGuideline = this.updateProductForm.get('productGuideline')?.value;
    let productAvailability = false;
    if (availability === 'Available') {
      productAvailability = true;
    }
    this.productService.updateProduct(this.product.productId,
      productName,
      displayName,
      serial,
      brand,
      extraState,
      productAvailability,
      availableUnits,
      hourlyCost,
      extraNote,
      productGuideline,
      this.FileImageLink
    ).subscribe(response => {
      console.log(response)
      if (response.code === 204) {
        this.clearFields(formDirective, this.updateProductForm);
        this.openSnackBar(response.message, 'close');
        location.reload();
      } else {
        this.openSnackBar('Something went wrong try again!', 'close');
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this.commonSnackBarService.trigger(message, action, [
      10000, 'success-snack-bar-common',
      'end',
      'top'
    ]);
  }

  clearFields(formDirective: FormGroupDirective, form: FormGroup): void {
    form.reset(); // Reset form data
    formDirective.resetForm(); // Reset the ugly validators
  }

  loadProductData() {
    let productAvailability = 'Available';
    if (this.product.availability == false) {
      productAvailability = 'Unavailable';
    }

    if (this.product) {
      this.updateProductForm.patchValue({
        productName: this.product.productName,
        displayName: this.product.displayName,
        serial: this.product.serial,
        availability: productAvailability,
        brand: this.product.brand,
        extraState: this.product.extraState,
        availableUnits: this.product.availableUnit,
        hourlyCost: this.product.hourlyCost,
        extraNote: this.product.extraNote,
        productGuideline: this.product.productGuideline

      })
    }
    this.FileImageLink = this.product.image;
    console.log(this.product.image)
  }

  onFileSelected(event: any) {
    console.log(event);
    let file: File = event.target.files[0];
    if (file) {
      console.log(file)
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('file', file);
      this.fileUploadService.upload(formData).subscribe(response => {
        this.FileImageLink = response;
        console.log(this.FileImageLink);
        this.fileImageUploadChecker = false;
        if (this.fileImageUploadChecker == false) {
          this.fileImageUploadHiddenEverythingChecker = 'none';
          this.fileImageUploadHiddenEverything = this.fileImageUploadHiddenEverythingChecker;
          this.fileImageOverlayChecker = 'rgba(201, 201, 201, 0.6)'
        }
      }, error1 => {
        console.log(error1)
      })
    }
  }

  private loadAllUnitTypes() {
    this.unitTypeService.getAllUnitTypes().subscribe(response => {
      this.unitTypes = response.data;
      console.log(this.unitTypes)
    }, error => {
      console.log(error);
      alert('please try again!');
    })
  }

  private loadAllProductTypes() {
    this.productTypeService.getAllProductTypes().subscribe(response => {
      this.productTypes = response.data;
    }, error => {
      console.log(error);
      alert('please try again!');
    })
  }

  private loadAllBrands() {
    this.brandService.getAllBrandsIdAndName().subscribe(response => {
      this.brands = response.data;
      console.log(this.brands)
    }, error => {
      console.log(error);
      alert('please try again!');
    })
  }
}
