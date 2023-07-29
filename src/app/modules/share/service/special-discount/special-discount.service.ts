import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class SpecialDiscountService {
  private baseurl=environment.baseUrl;
  private object:any;
  constructor(private http:HttpClient) { }

  public saveSpecialDiscount(data:any,productId:string):any{
    return this.http.post<any>(this.baseurl+`special-discount/admin/member/business/save-special-discount?productId=${productId}`,data);
  }

  public getAllSpecialDiscount(activeState:string,page:any,size:any,searchText:string,startDate:string,endDate:string){
    return this.http.get<any>(this.baseurl+`special-discount/main/visco/all-special-discount?activeState=${activeState}&endDate=${endDate}&page=${page}&searchText=${searchText}&size=${size}&startDate=${startDate}`);
  }

  public setObject(object:any){
    this.object=object;
  }

  public getObject(){
    return this.object;
  }

  public updateSpecialDiscount(data:any,discountId:string){
    return this.http.put(this.baseurl+`special-discount/main/visco/manage-special-discount${discountId}`,data);
  }

  public deleteSpecialDiscount(discountId:string){
    return this.http.delete(this.baseurl+`/special-discount/main/visco/delete-special-discount/${discountId}`)
  }
}


