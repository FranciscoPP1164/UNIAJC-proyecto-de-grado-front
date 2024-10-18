import { Status } from '../../../types/status.type';
import { UserType } from '../../../types/user.type';
import { IResponse } from '../IResponse.response';

export interface IUserResponse extends IResponse {
  name: string;
  email: string;
  type: UserType;
  status: Status;
}
