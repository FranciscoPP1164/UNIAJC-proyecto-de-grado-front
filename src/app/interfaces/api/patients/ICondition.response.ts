import { IResponse } from '../IResponse.response';

export interface IConditionResponse extends IResponse {
  description: string;
  patient_id: string;
}
