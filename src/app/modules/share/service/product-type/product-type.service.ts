import {Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getAllProductTypes(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'product-type/main/visco/allProductTypeByNameAndId', {
      headers: {Progress_Type: 'BAR'}
    });
  }

  newProductType(
    productTypeName: string
  ) {
    return this.http.post<any>(this.baseUrl + 'product-type/main/visco/save-product-type',
      {
        serviceData: [
          {}
        ],
        typeName: productTypeName
      }
    );
  }

  getAllProductTypesBySearchText(page: any, pageSize: any, searchText: string, productAvailability: string): Observable<any> {
    console.log(productAvailability)
    return this.http.get<any>(this.baseUrl + 'product-type/user/visco/all-product-type?availability=' + productAvailability + '&page=' + page + '&searchText=' + searchText + '&size=' + pageSize, {
      headers: {Progress_Type: 'BAR'}
    });
  }

  updateProductType(productTypeId: string, productTypeName: string) {
    console.log(productTypeId)
    return this.http.put<any>(this.baseUrl + 'product-type/main/visco/manage-product-Type' + productTypeId,
      {
        serviceData: [
          {}
        ],
        typeName: productTypeName
      }
    );
  }

  changeActiveStateByProductTypeId(productTypeId: string, productTypeActiveState: boolean) {
    return this.http.put<any>(this.baseUrl + 'product-type/main/visco/manage-availability/' + productTypeId + '/' + productTypeActiveState, {
      headers: {Progress_Type: 'BAR'}
    });
  }

  deleteProductType(productTypeId: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'product-type/main/visco/delete-product-type/' + productTypeId, {
        headers: {Progress_Type: 'BAR'}
      }
    );
  }
}
