import {Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {rentProductsDTO} from "../../dto/rentProductsDTO";

@Injectable({
  providedIn: 'root'
})
export class RentDataService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  newRentData(customerNIC: any, rentDetailsArray: Array<rentProductsDTO>, rentDate: Date) {
    console.log(' CusNIC '+customerNIC)
    console.log(rentDetailsArray)
    console.log(' Rent Date '+rentDate)
    return this.http.post<any>(this.baseUrl + 'rental-data?customerID=' + customerNIC,
      {}
    );
  }

  getAllRentDataBySearchText(page: any, pageSize: any, searchText: string, tempStartDate: any, tempEndDate: any) {
    return this.http.get<any>(this.baseUrl + 'rental-data/main/visco/get-all-rent-data?endDate=' + tempEndDate + '&page=' + page + '&searchText=' + searchText + '&size=' + pageSize + '&startDate=' + tempStartDate, {
        headers: {Progress_Type: 'BAR'}
      }
    );
  }

  viewAllRentDataById(rentId: any) {
    return this.http.get<any>(this.baseUrl + 'rental-data/main/visco/product/search-by-id?rentId='+ rentId, {
        headers: {Progress_Type: 'BAR'}
      }
    );
  }
}
