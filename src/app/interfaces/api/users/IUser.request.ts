import { Status } from '../../../types/status.type';
import { UserType } from '../../../types/user.type';

export interface IUserRequest {
  name: string;
  email: string;
  type: UserType;
  status?: Status;
}
