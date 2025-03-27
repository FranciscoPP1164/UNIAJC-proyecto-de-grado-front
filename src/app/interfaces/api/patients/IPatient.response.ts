import { IResponse } from '../IResponse.response';
import { IConditionResponse } from './ICondition.response';

export interface IPatientResponse extends IResponse {
  name: string;
  age: number;
  direction: string;
  document_identification: string;
  conditions?: IConditionResponse[];
}
