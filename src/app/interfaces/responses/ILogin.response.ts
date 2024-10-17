import { IResponse } from './IResponse.response';

export interface ILoginResponse extends IResponse {
  name: string;
  email: string;
  type: string;
  status: string;
  remember_token?: string;
  access_token: string;
}
