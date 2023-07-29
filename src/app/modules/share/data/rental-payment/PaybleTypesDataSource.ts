import {PayableDataTypeDTO} from "./PaybleDataTypeDTO";


export class PayableTypesDataSource{
  public getAllSources():Array<PayableDataTypeDTO>{
    return [
      new PayableDataTypeDTO('0','CARD'),
      new PayableDataTypeDTO('1','CASH'),
    ]
  }
}
