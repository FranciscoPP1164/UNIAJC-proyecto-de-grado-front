import { UserType } from '../../../types/user.type';

export interface IUserRequest {
  name: string;
  email: string;
  type: UserType;
}
