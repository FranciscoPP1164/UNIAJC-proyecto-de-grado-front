import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserResponse } from '../../interfaces/api/users/IUser.response';
import { IUserRequest } from '../../interfaces/api/users/IUser.request';
import { IUpdateUserRequest } from '../../interfaces/api/users/IUpdateUser.request';
import { GenericCrudService } from './generic-crud.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends GenericCrudService<
  IUserResponse,
  IUserRequest,
  IUpdateUserRequest
> {
  constructor(protected override http: HttpClient) {
    super('users');
  }
}
