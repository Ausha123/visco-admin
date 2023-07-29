import {GenderDataTypeDTO} from "./genderDataTypeDTO";


export class GenderTypesDataSource{
  public getAllSources():Array<GenderDataTypeDTO>{
    return [
      new GenderDataTypeDTO('0','MALE'),
      new GenderDataTypeDTO('1','FEMALE'),
    ]
  }
}
