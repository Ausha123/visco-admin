import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseurl=environment.baseUrl;
  private object:any;
    constructor(private http:HttpClient) { }


  public saveEmployee(data:any):any{
    return this.http.post<any>(this.baseurl+'employee/main/visco/save-employee',data)
  }

  public getAllEmployee(activeState:string,page:any,size:any,searchText:string){
    return this.http.get(this.baseurl+`employee/user/visco/all-employee?activeState=${activeState}&page=${page}&searchText=${searchText}&size=${size}`);
  }

  public updateEmployee(data:any, propertyId:string){
    return this.http.put(this.baseurl+`employee/main/visco/manage-employee/${propertyId}`,data);
  }

  public deleteEmployee(propertyId:string){
    return this.http.delete(this.baseurl+`employee/main/visco/delete-employee/${propertyId}`);
  }

  public getAllEmployees(){
      return this.http.get(this.baseurl+`employee/main/visco/get-employee-id-name`);
  }

  setObject(object:any){
    this.object=object;
  }

  getObject(){
    return this.object;
  }

}
