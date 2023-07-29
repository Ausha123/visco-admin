import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private baseurl=environment.baseUrl;
  private object:any;

  constructor(private http:HttpClient) { }

  public saveAttendance(data:any,propertyId:string):any{
    return this.http.post<any>(this.baseurl+`attendance/main/visco/save-attendance?employeeID=${propertyId}`,data)
  }

  public getAllAttendance(page:any,size:any){
    return this.http.get(this.baseurl+`attendance/user/visco/all-attendance?pageNo=${page}&size=${size}`);
  }

  public deleteAttendance(propertyId:string) {
    return this.http.delete(this.baseurl+`attendance/main/visco/delete-attendance/${propertyId}`);
  }

  public getAllAttendanceByEmployeeName(page:any,size:any){
    return this.http.get(this.baseurl+`attendance/user/visco/all-attendance-employee?page=${page}&size=${size}`);
  }

  public setObject(object:any){
    this.object=object;
  }

  public getObject(){
    return this.object;
  }
}
