import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {RequestProductDTO} from "../../dto/RequestProductDTO";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) {
  }

  newProduct(dto: RequestProductDTO): Observable<any> {
    return this._http.post<any>(this.baseUrl + 'product/admin/member/business/save-product?productTypeId=' + dto.productType + '&unitTypeId=' + dto.unitType,
      {
        availableUnit: dto.availableUnit,
        brand: dto.brand,
        displayName: dto.displayName,
        extraNote: dto.extraNote,
        extraState: dto.extraState,
        hourlyCost: dto.hourlyCost,
        image: dto.image,
        otherDetails: [
          {}
        ],
        productGuideline: dto.productGuideline,
        productName: dto.productName,
        serial: dto.serial
      }
    );
  }

  getAllBySearchText(page: any, pageSize: any, searchText: string, productAvailability: string, extraStateType: string): Observable<any> {
    return this._http.get<any>(this.baseUrl + 'product/user/visco/all-product-searchtext-availability-extra-state?availability=' + productAvailability + '&extraState=' + extraStateType + '&page=' + page + '&searchText=' + searchText + '&size=' + pageSize, {
      headers: {Progress_Type: 'BAR'}
    });
  }

  getAllProductsIdAndName() {
    return this._http.get<any>(this.baseUrl + 'product/main/visco/get-product-id-and-name', {
      headers: {Progress_Type: 'BAR'}
    });
  }

  updateProduct(
    productId: string,
    productName: string,
    displayName: string,
    serial: string,
    brand: string,
    extraState: string,
    productAvailability: boolean,
    availableUnits: number,
    hourlyCost: number,
    extraNote: string,
    productGuideline: string,
    url: any): Observable<any> {
    return this._http.put<any>(this.baseUrl + 'product/main/visco/manage-product/' + productId,
      {
        availability: productAvailability,
        availableUnit: availableUnits,
        brand: brand,
        displayName: displayName,
        extraNote: extraNote,
        extraState: extraState,
        hourlyCost: hourlyCost,
        image: url,
        otherDetails: [
          {}
        ],
        productGuideline: productGuideline,
        productName: productName,
        serial: serial
      }
    );
  }

  deleteProduct(productId: string): Observable<any> {
    return this._http.delete<any>(this.baseUrl + 'product/main/visco/delete-brand/' + productId, {
        headers: {Progress_Type: 'BAR'}
      }
    );
  }
}
