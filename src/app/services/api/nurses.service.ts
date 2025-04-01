import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud.service';
import { INurseResponse } from '../../interfaces/api/nurses/INurse.response';
import { INurseRequest } from '../../interfaces/api/nurses/INurse.request';
import { IUpdateNurseRequest } from '../../interfaces/api/nurses/IUpdateNurse.request';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NursesService extends GenericCrudService<
  INurseResponse,
  INurseRequest,
  IUpdateNurseRequest
> {
  constructor(protected override http: HttpClient) {
    super('nurses');
  }
}
