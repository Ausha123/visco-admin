import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdvanceClearenceService {
  private baseurl=environment.baseUrl;
  private object:any;

  constructor(private http:HttpClient) {

  }

  public saveAdvanceClearence(data:any,propertyId:string):any{
    return this.http.post<any>(this.baseurl+`advance-clearance/main/visco/save-advance-clearance?propertyID=${propertyId}`,data)
  }

  public getAllAdvanceClearance(page:any,size:any,endDate:any,startDate:any){
    return this.http.get(this.baseurl+`advance-clearance/main/visco/all-advance-clearance?endDate=2022-07-30&page=0&size=10&startDate=2022-07-01`);
  }

  public updateAdvanceClearance(data:any,propertyId:string){
    return this.http.put(this.baseurl+`advance-clearance/main/visco/advance-Clearence${propertyId}`,data);
  }

  public deleteAdvanceClearance(propertyId:string){
    return this.http.delete(this.baseurl+`advance-clearance/main/visco/delete-advance-clearence/${propertyId}`);
  }

  public setObject(object:any){
    this.object=object;
  }

  public getObject(){
    return this.object;
  }
}
