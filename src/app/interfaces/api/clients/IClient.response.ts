import { IResponse } from '../IResponse.response';

export interface IClientResponse extends IResponse {
  name: string;
  email: string;
  phone: string;
  document_identification: string;
}
