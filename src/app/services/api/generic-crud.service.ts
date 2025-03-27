import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environtments/environtment';
import { IPagination } from '../../interfaces/api/IPagination.response';

export abstract class GenericCrudService<Response, Request, Update> {
  protected readonly url: string = environment.api.url;
  protected http!: HttpClient;

  constructor(protected service: string) {}

  public all(
    page: number = 1,
    rowsPerPage: number = 10
  ): Promise<IPagination<Response>> {
    return new Promise<IPagination<Response>>((resolve, reject) => {
      this.http
        .get<IPagination<Response>>(
          `${this.url}/${this.service}?page=${page}&rowsPerPage=${rowsPerPage}`
        )
        .subscribe({
          next: (response: IPagination<Response>) => {
            return resolve(response);
          },
          error: (error: HttpErrorResponse) => {
            return reject(error);
          },
        });
    });
  }

  public get(id: string): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      this.http.get<Response>(`${this.url}/${this.service}/${id}`).subscribe({
        next: (response: Response) => {
          return resolve(response);
        },
        error: (error: HttpErrorResponse) => {
          return reject(error);
        },
      });
    });
  }

  public create(data: Request): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      this.http.post<Response>(`${this.url}/${this.service}`, data).subscribe({
        next: (response: Response) => {
          return resolve(response);
        },
        error: (error: HttpErrorResponse) => {
          return reject(error);
        },
      });
    });
  }

  public update(data: Update, id: string): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      this.http
        .put<Response>(`${this.url}/${this.service}/${id}`, data)
        .subscribe({
          next: (response: Response) => {
            return resolve(response);
          },
          error: (error: HttpErrorResponse) => {
            return reject(error);
          },
        });
    });
  }

  public delete(id: string): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      this.http
        .delete<Response>(`${this.url}/${this.service}/${id}`)
        .subscribe({
          next: (response: Response) => {
            return resolve(response);
          },
          error: (error: HttpErrorResponse) => {
            return reject(error);
          },
        });
    });
  }

  public restore(id: string): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      this.http
        .post<Response>(`${this.url}/${this.service}/${id}/restore`, {})
        .subscribe({
          next: (response: Response) => {
            return resolve(response);
          },
          error: (error: HttpErrorResponse) => {
            return reject(error);
          },
        });
    });
  }

  public deletePermanently(id: string): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      this.http
        .delete<Response>(`${this.url}/${this.service}/${id}/permanently`)
        .subscribe({
          next: (response: Response) => {
            return resolve(response);
          },
          error: (error: HttpErrorResponse) => {
            return reject(error);
          },
        });
    });
  }
}
