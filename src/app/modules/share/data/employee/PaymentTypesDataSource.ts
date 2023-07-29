
import {PaymentDataTypeDTO} from "./PaymentDataTypeDTO";

export class PaymentTypesDataSource{
  public getAllSources():Array<PaymentDataTypeDTO>{
    return [
      new PaymentDataTypeDTO('0','DAILY'),
      new PaymentDataTypeDTO('1','WEEKLY'),
      new PaymentDataTypeDTO('1','MONTHLY'),
    ]
  }
}
