import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {RentalPaymentDTO} from "../../dto/RentalPaymentDTO";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})


export class RentalPaymentService {
  private baseUrl = environment.baseUrl;
  private object:any;

  constructor(private http:HttpClient) {
  }

  public saveRental(dto: RentalPaymentDTO, rentId:string): Observable<any> {
    return this.http.post(this.baseUrl + `rental-payment/admin/member/business/save-rental-payment?rentID=${rentId}`,{

      // extraChargesData:dto.extraChargesData,
      balance:dto.balance,
      rentalPaymentDate:dto.rentalPaymentDate,
      discount:dto.discount,
      extraCharges:dto.extraCharges,
      payment:dto.payment,
      paymentType:dto.paymentType,
      tax:dto.tax,
    },{
      headers: {Progress_Type: 'SPINNER'}
    });
  }

  public getRentalData(pageNo:any,size:any, startDate:string,endDate:string):any {
    return this.http.get<any>(this.baseUrl+`rental-payment/admin/member/business/getAll-special-discount?endDate=${endDate}&pageNo=${pageNo}&size=${size}&startDate=${startDate}`);
  }


  public updateRental(dto: RentalPaymentDTO, id:string): Observable<any> {
    return this.http.put(this.baseUrl + `rental-payment/main/visco/manage-rental-payment${id}`,{

      balance: dto.balance,
      discount: dto.discount,
      extraCharges: dto.extraCharges,
      payment: dto.payment,
      paymentType: dto.paymentType,
      rentalPaymentDate: dto.rentalPaymentDate,
      tax: dto.tax
    },{
      headers: {Progress_Type: 'SPINNER'}
    });
  }

  public getObject():any{
    return this.object;
  }

  public setObject(object:any){
    this.object=object;
  }

  public deleteRental(id:string){
    return this.http.delete((this.baseUrl+`rental-payment/main/visco/delete-rental-payment/${id}`));
  }
}


