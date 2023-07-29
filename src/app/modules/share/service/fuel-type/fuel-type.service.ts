import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FuelTypeService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  newFuelType(fuelTypeName: string) {
    return this.http.post<any>(this.baseUrl + 'fuel-type/main/visco/save-fuel-type',
      {
        displayName: fuelTypeName,
        otherDetails: [
          {}
        ]
      }
    );
  }

  getAllFuelTypesBySearchText(page: any, pageSize: any, searchText: string, fuelTypeActiveState: string) {
    return this.http.get<any>(this.baseUrl + 'fuel-type/main/visco/all-fuel-type?activeState=' + fuelTypeActiveState + '&page=' + page + '&searchText=' + searchText + '&size=' + pageSize, {
      headers: {Progress_Type: 'BAR'}
    });
  }

  updateFuelType(fuelTypeId: string, fuelTypeName: string) {
    return this.http.put<any>(this.baseUrl + 'fuel-type/main/visco/manage-fuel-type' + fuelTypeId,
      {
        displayName: fuelTypeName,
        otherDetails: [
          {}
        ]
      }
    );
  }

  deleteFuelType(fuelTypeId: string) {
    return this.http.delete<any>(this.baseUrl + 'fuel-type/main/visco/delete-fuel-type/'+fuelTypeId,{
        headers: {Progress_Type: 'BAR'}
      }
    );
  }

  changeActiveStateByFuelTypeId(fuelId: string, fuelTypeActiveState: boolean) {
    return this.http.put<any>(this.baseUrl + 'fuel-type/main/visco/fuel-type-manage-availability?activeState='+fuelTypeActiveState+'&propertyId='+fuelId, {
      headers: {Progress_Type: 'BAR'}
    });
  }
}
