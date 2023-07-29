export class RentalPaymentDTO{
  constructor(
    public balance:number,
    public rentalPaymentDate:Date,
    public discount:number,
    public extraCharges:number,
    // public extraChargesData:string,
    public payment:number,
    public paymentType:string,
    public tax:number
  ) {
  }
}
