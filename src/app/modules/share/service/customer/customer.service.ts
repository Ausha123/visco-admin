import {Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseurl = environment.baseUrl;
  private object: any;

  constructor(private http: HttpClient) {
  }


  public saveCustomer(data: any): any {
    return this.http.post<any>(this.baseurl + 'customer/admin/member/business/save-customer', data)
  }

  public getAllCustomers(page: any, size: any, searchText: string, startDate: string, endDate: string) {
    return this.http.get<any>(this.baseurl + `customer/main/visco/get-all-customer?endDate=${endDate}&page=${page}&searchText=${searchText}&size=${size}&startDate=${startDate}`);
  }

  public deleteCustomer(nic: string) {
    return this.http.delete(this.baseurl + `customer/main/visco/delete-customer/${nic}`);
  }

  public updateCustomer(data: any, nic: string) {
    return this.http.put(this.baseurl + `customer/main/visco/manage-customer/${nic}`, data);
  }

  public getAllCustomersNIC(){
    return this.http.get(this.baseurl+`customer/main/visco/product/search-by-id`);
  }

  setObject(object: any) {
    this.object = object;
  }

  getObject() {
    return this.object;
  }

  getAllCustomerIds() {
    return this.http.get<any>(this.baseurl + 'customer/main/visco/get-customerid', {
      headers: {Progress_Type: 'BAR'}
    });
  }
}
