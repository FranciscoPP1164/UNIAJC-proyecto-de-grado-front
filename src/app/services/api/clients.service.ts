import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud.service';
import { IClientResponse } from '../../interfaces/api/clients/IClient.response';
import { IClientRequest } from '../../interfaces/api/clients/IClient.request';
import { IUpdateClientRequest } from '../../interfaces/api/clients/IUpdateClient.request';

@Injectable({
  providedIn: 'root',
})
export class ClientsService extends GenericCrudService<
  IClientResponse,
  IClientRequest,
  IUpdateClientRequest
> {
  constructor(protected override http: HttpClient) {
    super('clients');
  }
}
