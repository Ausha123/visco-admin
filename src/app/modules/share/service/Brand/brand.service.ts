import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getAllBrandsIdAndName(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'brand/main/visco/get-brand', {
      headers: {Progress_Type: 'BAR'}
    });
  }

  newBrand(
    brandName: string,
    image: string
  ) {
    return this.http.post<any>(this.baseUrl + 'brand/main/visco/save-brand',
      {
        brandName: brandName,
        displayImage: image,
        otherDetails: [
          {}
        ]
      }
    );
  }

  getAllBrandsBySearchText(page: any, pageSize: any, searchText: string, brandActiveState: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'brand/main/visco/all-brand?activeState=' + brandActiveState + '&page=' + page + '&searchText=' + searchText + '&size=' + pageSize, {
      headers: {Progress_Type: 'BAR'}
    });
  }

  updateBrand(brandId: string, brandName: string, image: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'brand/main/visco/brand'+brandId,
      {
        brandName: brandName,
        displayImage: image,
        otherDetails: [
          {}
        ]
      }
    );
  }

  deleteBrand(brandId: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'brand/main/visco/delete-brand/'+brandId,{
        headers: {Progress_Type: 'BAR'}
        }
    );
  }

    changeActiveStateByBrandId(brandId: string, brandActiveState: boolean): Observable<any> {
      return this.http.put<any>(this.baseUrl + 'brand/main/visco/brand-manage-availability?activeState='+brandActiveState+'&propertyId='+brandId, {
          headers: {Progress_Type: 'BAR'}
        }
      );
    }
}
