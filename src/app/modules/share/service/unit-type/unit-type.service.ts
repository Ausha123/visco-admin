import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UnitTypeService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllUnitTypes(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'unit-type/main/visco/allUnitTypeByNameAndId' , {
      headers: {Progress_Type: 'BAR'}
    });
  }

  newUnitType(unitTypeName: string,symbol: string) {
    return this.http.post<any>(this.baseUrl + 'unit-type/main/visco/save-unit-type',
      {
        otherData: [
          {}
        ],
        symbol: symbol,
        unitName: unitTypeName
      }
    );
  }

  getAllUnitTypesBySearchText(page: any, pageSize: any, searchText: string, productAvailability: string): Observable<any> {
    console.log(productAvailability)
    return this.http.get<any>(this.baseUrl + 'unit-type/user/visco/all-unit-type?availability='+productAvailability+'&page='+page+'&searchText='+searchText+'&size='+pageSize, {
      headers: {Progress_Type: 'BAR'}
    });
  }

  changeActiveStateByUnitTypeId(typeId: string, unitTypeActiveState: boolean) {
    return this.http.put<any>(this.baseUrl + 'unit-type/main/visco/manage-unit-type-availability/'+typeId+'/'+unitTypeActiveState, {
      headers: {Progress_Type: 'BAR'}
    });
  }

  updateUnitType(unitTypeId: string, unitTypeName: string,symbol:string) {
    return this.http.put<any>(this.baseUrl + 'unit-type/main/visco/manage-Unit-Type' + unitTypeId,
      {
        otherData: [
          {}
        ],
        symbol: symbol,
        unitName: unitTypeName
      }
    );
  }

  deleteUnitType(unitTypeId: string):Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'unit-type/main/visco/delete-unit-type/'+unitTypeId,{
        headers: {Progress_Type: 'BAR'}
      }
    );
  }
}
