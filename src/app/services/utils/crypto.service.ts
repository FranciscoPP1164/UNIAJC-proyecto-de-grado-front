import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import { environment } from '../../../environtments/environtment';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private readonly hashKey = environment.security.hashKey;

  public encrypt(textToEncrypt: string): string {
    return CryptoJS.AES.encrypt(textToEncrypt, this.hashKey).toString();
  }

  public decrypt(textToDecrypt: string): string {
    return CryptoJS.AES.decrypt(textToDecrypt, this.hashKey).toString(
      CryptoJS.enc.Utf8
    );
  }
}
