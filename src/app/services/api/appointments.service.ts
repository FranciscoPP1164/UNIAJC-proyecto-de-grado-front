import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud.service';
import { IAppointmentResponse } from '../../interfaces/api/apointments/IAppointment.response';
import { IAppointmentRequest } from '../../interfaces/api/apointments/IAppointment.request';
import { IUpdateAppointmentRequest } from '../../interfaces/api/apointments/IUpdateAppointment.request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ICommentRequest } from '../../interfaces/api/apointments/IComment.request';
import { ICommentResponse } from '../../interfaces/api/apointments/IComment.response';
import { IUpdateCommentRequest } from '../../interfaces/api/apointments/IUpdateComment.request';
import { IPagination } from '../../interfaces/api/IPagination.response';
import { AppointmentStatus } from '../../types/appointment-status.type';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService extends GenericCrudService<
  IAppointmentResponse,
  IAppointmentRequest,
  IUpdateAppointmentRequest
> {
  constructor(protected override http: HttpClient) {
    super('appointments');
  }

  public allWithFilters(
    page: number = 1,
    rowsPerPage: number = 10,
    startDateTime?: Date,
    endDateTime?: Date,
    status?: AppointmentStatus
  ): Promise<IPagination<IAppointmentResponse>> {
    return new Promise<IPagination<IAppointmentResponse>>((resolve, reject) => {
      const params: { [key: string]: string | number } = {
        page,
        rowsPerPage,
      };

      if (startDateTime) params['startDateTime'] = startDateTime.toString();
      if (endDateTime) params['endDateTime'] = endDateTime.toString();
      if (status) params['status'] = status;

      this.http
        .get<IPagination<IAppointmentResponse>>(
          `${this.url}/${this.service}/filter`,
          { params }
        )
        .subscribe({
          next: (appointments: IPagination<IAppointmentResponse>) => {
            return resolve(appointments);
          },
          error: (error: HttpErrorResponse) => {
            return reject(error);
          },
        });
    });
  }

  public createComment(
    data: ICommentRequest,
    appointmentId: string
  ): Promise<ICommentResponse> {
    return new Promise<ICommentResponse>((resolve, reject) => {
      this.http
        .post<ICommentResponse>(
          `${this.url}/${this.service}/${appointmentId}/comments`,
          data
        )
        .subscribe({
          next: (comment: ICommentResponse) => {
            return resolve(comment);
          },
          error: (error: HttpErrorResponse) => {
            return reject(error);
          },
        });
    });
  }

  public updateComment(
    data: IUpdateCommentRequest,
    appointmentId: string,
    commentId: string
  ): Promise<ICommentResponse> {
    return new Promise<ICommentResponse>((resolve, reject) => {
      this.http
        .put<ICommentResponse>(
          `${this.url}/${this.service}/${appointmentId}/comments/${commentId}`,
          data
        )
        .subscribe({
          next: (comment: ICommentResponse) => {
            return resolve(comment);
          },
          error: (error: HttpErrorResponse) => {
            return reject(error);
          },
        });
    });
  }

  public deleteComment(
    appointmentId: string,
    commentId: string
  ): Promise<ICommentResponse> {
    return new Promise<ICommentResponse>((resolve, reject) => {
      this.http
        .delete<ICommentResponse>(
          `${this.url}/${this.service}/${appointmentId}/comments/${commentId}`
        )
        .subscribe({
          next: (comment: ICommentResponse) => {
            return resolve(comment);
          },
          error: (error: HttpErrorResponse) => {
            return reject(error);
          },
        });
    });
  }

  public start(appointmentId: string): Promise<IAppointmentResponse> {
    return new Promise<IAppointmentResponse>((resolve, reject) => {
      this.http
        .post<IAppointmentResponse>(
          `${this.url}/${this.service}/${appointmentId}/start`,
          {}
        )
        .subscribe({
          next: (appointment: IAppointmentResponse) => {
            return resolve(appointment);
          },
          error: (error: HttpErrorResponse) => {
            return reject(error);
          },
        });
    });
  }

  public cancel(appointmentId: string): Promise<IAppointmentResponse> {
    return new Promise<IAppointmentResponse>((resolve, reject) => {
      this.http
        .post<IAppointmentResponse>(
          `${this.url}/${this.service}/${appointmentId}/cancel`,
          {}
        )
        .subscribe({
          next: (appointment: IAppointmentResponse) => {
            return resolve(appointment);
          },
          error: (error: HttpErrorResponse) => {
            return reject(error);
          },
        });
    });
  }

  public end(appointmentId: string): Promise<IAppointmentResponse> {
    return new Promise<IAppointmentResponse>((resolve, reject) => {
      this.http
        .post<IAppointmentResponse>(
          `${this.url}/${this.service}/${appointmentId}/end`,
          {}
        )
        .subscribe({
          next: (appointment: IAppointmentResponse) => {
            return resolve(appointment);
          },
          error: (error: HttpErrorResponse) => {
            return reject(error);
          },
        });
    });
  }
}
