import { IResponse } from './IResponse.response';

export interface ISignupResponse extends IResponse {
  name: string;
  email: string;
  type: string;
  status: string;
}
