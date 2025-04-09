import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud.service';
import { INurseResponse } from '../../interfaces/api/nurses/INurse.response';
import { INurseRequest } from '../../interfaces/api/nurses/INurse.request';
import { IUpdateNurseRequest } from '../../interfaces/api/nurses/IUpdateNurse.request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IPagination } from '../../interfaces/api/IPagination.response';

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

  public frees(
    startDateTime: Date,
    endDateTime: Date
  ): Promise<INurseResponse[]> {
    return new Promise<INurseResponse[]>((resolve, reject) => {
      this.http
        .get<INurseResponse[]>(`${this.url}/${this.service}/frees`, {
          params: {
            startDateTime: startDateTime.toISOString(),
            endDateTime: endDateTime.toISOString(),
          },
        })
        .subscribe({
          next: (response: INurseResponse[]) => {
            return resolve(response);
          },
          error: (error: HttpErrorResponse) => {
            return reject(error);
          },
        });
    });
  }
}
