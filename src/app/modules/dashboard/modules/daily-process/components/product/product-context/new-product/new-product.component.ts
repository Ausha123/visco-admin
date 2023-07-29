import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {ProductService} from "../../../../../../../share/service/product/product.service";
import {CommonSnackBarService} from "../../../../../../../share/service/core/common-snack-bar-service.service";
import {UnitTypeService} from "../../../../../../../share/service/unit-type/unit-type.service";
import {ProductTypeService} from "../../../../../../../share/service/product-type/product-type.service";
import {BrandService} from "../../../../../../../share/service/Brand/brand.service";
import {RequestProductDTO} from "../../../../../../../share/dto/RequestProductDTO";
import {FileUploadService} from "../../../../../../../share/service/file-upload/file-upload.service";
import {LoaderService} from "../../../../../../../share/service/core/loader-service/loader.service";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  filesToUpload: Array<File> = [];
  urls = new Array<string>();
  FileImageLink: any = '';
  fileImageUploadChecker: boolean = true;
  fileImageUploadHiddenEverythingChecker: string = '';
  fileImageUploadHiddenEverything: string = '';
  fileImageOverlay: string = '';
  fileImageOverlayChecker: string = '';

  fileName = '';

  onFileSelected(event: any) {
    console.log(event);
    let file:File = event.target.files[0];
    if (file) {
      console.log(file)
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('file', file);
      this.fileUploadService.upload(formData).subscribe(response => {
        this.FileImageLink = response;
        console.log(this.FileImageLink);
        this.fileImageUploadChecker = false;
        if (this.fileImageUploadChecker == false){
          this.fileImageUploadHiddenEverythingChecker = 'none';
          this.fileImageUploadHiddenEverything = this.fileImageUploadHiddenEverythingChecker;
          this.fileImageOverlayChecker = 'rgba(201, 201, 201, 0.6)'
        }
      },error1 => {
        console.log(error1)
      })
    }
  }

  unitTypes: Array<any> = [];
  productTypes: Array<any> = [];
  brands: Array<any> = [];
  extraState: string[] = ['REGULAR', 'TOP_PRODUCT', 'NEW_ARRIVAL', 'FEATURED', 'TOP_RATED','NEW_ITEMS','HAND_TOOLS','BEST_SELLER_ONE','BEST_SELLER_TWO'];
  availability: string[] = ['Available', 'Not available'];

  newProductForm = new FormGroup({
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
    productType: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    unitType: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    brand: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    extraState: new FormControl(null,
      [Validators.required
      ]),
    // availability: new FormControl(null,
    //   [Validators.required,
    //     Validators.minLength(3),
    //     Validators.maxLength(100)
    //   ]),
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

  constructor(private commonSnackBarService: CommonSnackBarService,
              private productService: ProductService,
              private unitTypeService: UnitTypeService,
              private productTypeService: ProductTypeService,
              private brandService: BrandService,
              private fileUploadService: FileUploadService,
              public loadingService: LoaderService
  ) {
  }

  ngOnInit(): void {
    this.loadAllUnitTypes();
    this.loadAllProductTypes();
    this.loadAllBrands();
  }

  submitData(formDirective: FormGroupDirective) {
    let productName = this.newProductForm.get('productName')?.value;
    let displayName = this.newProductForm.get('displayName')?.value;
    let serial = this.newProductForm.get('serial')?.value;
    let productType = this.newProductForm.get('productType')?.value;
    let unitType = this.newProductForm.get('unitType')?.value;
    let brand = this.newProductForm.get('brand')?.value;
    let extraState = this.newProductForm.get('extraState')?.value;
    // let availability = this.newProductForm.get('availability')?.value;
    let availableUnits = this.newProductForm.get('availableUnits')?.value;
    let hourlyCost = this.newProductForm.get('hourlyCost')?.value;
    let extraNote = this.newProductForm.get('extraNote')?.value;
    let productGuideline = this.newProductForm.get('productGuideline')?.value;

    this.productService.newProduct(new RequestProductDTO(
        productName,
        displayName,
        serial,
        productType,
        unitType,
        brand,
        extraState,
        availableUnits,
        hourlyCost,
        extraNote,
        productGuideline,
        this.FileImageLink
    )).subscribe(response => {
      console.log(response)
      if (response.code === 201) {
        this.clearFields(formDirective, this.newProductForm);
        this.openSnackBar(response.message, 'close');
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
