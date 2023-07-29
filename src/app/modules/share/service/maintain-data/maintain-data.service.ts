import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MaintainDataService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  newMaintainData(productId: string, cost: number, date: Date, note: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'maintain-data/admin/member/business/maintain-data?productId=' + productId,
      {
        cost: cost,
        date: date,
        note: note
      });
  }

  getAllMaintainDataBySearchText(page: any, pageSize: any, searchText: string, startDate: string, endDate: string): Observable<any> {
    console.log(startDate + "  " + endDate)
    return this.http.get<any>(this.baseUrl + 'maintain-data/user/visco/all-product-maintain-data?endDate=' + endDate + '&page=' + page + '&searchText=' + searchText + '&size=' + pageSize + '&startDate=' + startDate, {
      headers: {Progress_Type: 'BAR'}
    });
  }

  deleteMaintainData(maintainDataId: string) {
    return this.http.delete<any>(this.baseUrl + 'maintain-data/main/visco/delete-maintain-data/' + maintainDataId, {
        headers: {Progress_Type: 'BAR'}
      }
    );
  }

  updateMaintainData(maintainId: string, productId: string, date: Date, cost: number, note: string) {
    return this.http.put<any>(this.baseUrl + 'maintain-data/main/visco/manage-maintain-data' + maintainId,
      {
        cost: 0,
        date: date,
        productId: productId,
        note: note
      }
    );
  }

}
