import { Injectable } from '@angular/core';
import { environment } from '../../../environtments/environtment';
import { ILoginResponse } from '../../interfaces/responses/ILogin.response';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../utils/local-storage.service';
import { ILoginRequest } from '../../interfaces/requests/ILogin.request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url: string = environment.api.url;
  public activeUser: ILoginResponse | null = null;

  public constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    const userString = this.localStorageService.getEncryptedItem('user');

    if (userString) {
      this.activeUser = JSON.parse(userString);
    }
  }

  public login(name: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const data: ILoginRequest = { name, password };

      this.http.post<ILoginResponse>(`${this.url}/auth/login`, data).subscribe({
        next: (response: ILoginResponse) => {
          this.saveUser(response);
          return resolve(true);
        },
        error: (error: HttpErrorResponse) => {
          return reject(error);
        },
      });
    });
  }

  private saveUser(user: ILoginResponse): void {
    const data = JSON.stringify(user);
    this.localStorageService.storeEncrypted('user', data);
    this.activeUser = user;
  }
}
