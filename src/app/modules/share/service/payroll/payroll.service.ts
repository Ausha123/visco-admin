import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  private baseurl=environment.baseUrl;
  private object:any;



  constructor(private http:HttpClient) { }


  public savePayroll(data:any,propertyId:string):any{
    return this.http.post<any>(this.baseurl+`payroll/main/visco/save-payroll?employeeID=${propertyId}`,data);
  }

  public getAllPayroll(page:any,size:any,searchText:string,endDate:string,startDate:string){
    return this.http.get(this.baseurl+`payroll/main/visco/get-all-payroll?endDate=${endDate}&page=${page}&searchText=${searchText}&size=${size}&startDate=${startDate}`);
  }

  public updatePayroll(data:any,propertyId:string){
    return this.http.put(this.baseurl+`payroll/main/visco/payroll/${propertyId}`,data);
  }

  public deletePayroll(propertyId:string){
    return this.http.delete(this.baseurl+`payroll/main/visco/delete-payroll/${propertyId}`);
  }

  public setObject(object:any){
    this.object=object;
  }

  public getObject(){
    return this.object;
  }


}
