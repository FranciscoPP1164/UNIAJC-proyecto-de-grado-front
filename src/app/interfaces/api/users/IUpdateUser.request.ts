import { Status } from '../../../types/status.type';
import { UserType } from '../../../types/user.type';

export interface IUpdateUserRequest {
  name?: string;
  email?: string;
  type?: UserType;
  status?: Status;
}
