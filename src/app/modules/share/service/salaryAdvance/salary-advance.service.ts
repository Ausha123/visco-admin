import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SalaryAdvanceService {
  private baseurl=environment.baseUrl;
  private object:any;
  private salaryAdvanceId:string='';

  constructor(private http:HttpClient) { }

  public saveSalaryAdvance(data:any,propertyId:string):any{
    return this.http.post<any>(this.baseurl+`salary-advance/main/visco/save-salary-advance?employeeID=${propertyId}`,data)
  }

  public getAllSalaryAdvance(page:any,size:any,searchText:string,endDate:string,startDate:string){
    return this.http.get(this.baseurl+`salary-advance/main/visco/get-all-salary-advance?endDate=${endDate}&page=${page}&searchText=${searchText}&size=${size}&startDate=${startDate}`);
  }

  public updateSalaryAdvance(data:any,propertyId:string){
    return this.http.put(this.baseurl+`salary-advance/main/visco/salary-advance${propertyId}`,data);
  }

  public deleteSalaryAdvance(propertyId:string){
    return this.http.delete(this.baseurl+`salary-advance/main/visco/delete-salary-advance/${propertyId}`);
  }

  public setObject(object:any){
    this.object=object;
  }

  public getObject(){
    return this.object;
  }

  public setId(id:string){
    this.salaryAdvanceId=id;
  }

  public getId(){
    return this.salaryAdvanceId;
  }
}
