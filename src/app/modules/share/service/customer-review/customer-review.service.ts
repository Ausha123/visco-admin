import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerReviewService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getAllCustomerReviewsBySearchText(page: any, pageSize: any, searchText: string) {
    return this.http.get<any>(this.baseUrl + 'customer-review/main/visco/get-all-customer-review-using-search-text?page='+page+'&searchText='+searchText+'&size='+pageSize, {
      headers: {Progress_Type: 'BAR'}
    });
  }
}
