import { Injectable } from '@angular/core';
import { environment } from '../../../environtments/environtment';
import { ILoginResponse } from '../../interfaces/api/auth/ILogin.response';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../utils/local-storage.service';
import { ILoginRequest } from '../../interfaces/api/auth/ILogin.request';
import { ISignupRequest } from '../../interfaces/api/auth/ISignup.request';
import { ISignupResponse } from '../../interfaces/api/auth/ISignup.response';
import { IRegisterRequest } from '../../interfaces/api/auth/IRegister.request';
import { IUserResponse } from '../../interfaces/api/users/IUser.response';

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

  public login(name: string, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const data: ILoginRequest = { name, password };

      this.http.post<ILoginResponse>(`${this.url}/auth/login`, data).subscribe({
        next: (response: ILoginResponse) => {
          this.saveUser(response);
          return resolve();
        },
        error: (error: HttpErrorResponse) => {
          return reject(error);
        },
      });
    });
  }

  public signup(credentials: ISignupRequest): Promise<ISignupResponse> {
    return new Promise<ISignupResponse>((resolve, reject) => {
      this.http
        .post<ISignupResponse>(`${this.url}/auth/signup`, credentials)
        .subscribe({
          next: (response: ISignupResponse) => {
            return resolve(response);
          },
          error: (error: HttpErrorResponse) => {
            return reject(error);
          },
        });
    });
  }

  public register(
    credentials: IRegisterRequest,
    id: string,
    verifyToken: string
  ): Promise<IUserResponse> {
    return new Promise<IUserResponse>((resolve, reject) => {
      this.http
        .post<IUserResponse>(
          `${this.url}/auth/register/${id}?verificationToken=${verifyToken}`,
          credentials
        )
        .subscribe({
          next: (response: IUserResponse) => {
            return resolve(response);
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
