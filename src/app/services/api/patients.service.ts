import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud.service';
import { IPatientResponse } from '../../interfaces/api/patients/IPatient.response';
import { IPatientRequest } from '../../interfaces/api/patients/IPatient.request';
import { IUpdatePatientRequest } from '../../interfaces/api/patients/IUpdatePatient.request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IConditionResponse } from '../../interfaces/api/patients/ICondition.response';
import { IConditionRequest } from '../../interfaces/api/patients/ICondition.request';
import { IUpdateConditionRequest } from '../../interfaces/api/patients/IUpdateCondition.request';

@Injectable({
  providedIn: 'root',
})
export class PatientsService extends GenericCrudService<
  IPatientResponse,
  IPatientRequest,
  IUpdatePatientRequest
> {
  constructor(protected override http: HttpClient) {
    super('patients');
  }

  public createCondition(
    data: IConditionRequest,
    patientId: string
  ): Promise<IConditionResponse> {
    return new Promise<IConditionResponse>((resolve, reject) => {
      this.http
        .post<IConditionResponse>(
          `${this.url}/${this.service}/${patientId}/conditions`,
          data
        )
        .subscribe({
          next: (condition: IConditionResponse) => {
            return resolve(condition);
          },
          error: (error: HttpErrorResponse) => {
            return reject(error);
          },
        });
    });
  }

  public updateCondition(
    data: IUpdateConditionRequest,
    patientId: string,
    conditionId: string
  ): Promise<IConditionResponse> {
    return new Promise<IConditionResponse>((resolve, reject) => {
      this.http
        .put<IConditionResponse>(
          `${this.url}/${this.service}/${patientId}/conditions/${conditionId}`,
          data
        )
        .subscribe({
          next: (condition: IConditionResponse) => {
            return resolve(condition);
          },
          error: (error: HttpErrorResponse) => {
            return reject(error);
          },
        });
    });
  }

  public deleteCondition(
    patientId: string,
    conditionId: string
  ): Promise<IConditionResponse> {
    return new Promise<IConditionResponse>((resolve, reject) => {
      this.http
        .delete<IConditionResponse>(
          `${this.url}/${this.service}/${patientId}/conditions/${conditionId}`
        )
        .subscribe({
          next: (condition: IConditionResponse) => {
            return resolve(condition);
          },
          error: (error: HttpErrorResponse) => {
            return reject(error);
          },
        });
    });
  }
}
