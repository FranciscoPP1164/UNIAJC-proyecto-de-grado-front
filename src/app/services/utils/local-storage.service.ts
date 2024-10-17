import { Injectable } from '@angular/core';
import { environment } from '../../../environtments/environtment';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly root = environment.localStorage.rootName;

  public constructor(private cryptoService: CryptoService) {}

  public store(key: string, value: string): void {
    const realKey = this.getRealKey(key);
    localStorage.setItem(realKey, value);
  }

  public storeEncrypted(key: string, value: string): void {
    const encryptedValue = this.cryptoService.encrypt(value);
    const realKey = this.getRealKey(key);
    localStorage.setItem(realKey, encryptedValue);
  }

  public getItem(key: string): string | null {
    const realKey = this.getRealKey(key);
    return localStorage.getItem(realKey);
  }

  public getEncryptedItem(key: string): string | null {
    const realKey = this.getRealKey(key);
    const encryptedValue = localStorage.getItem(realKey);

    if (!encryptedValue) {
      return null;
    }

    return this.cryptoService.decrypt(encryptedValue);
  }

  public removeItem(key: string): void {
    const realKey = this.getRealKey(key);
    localStorage.removeItem(realKey);
  }

  private getRealKey(key: string): string {
    return `${this.root}::${key}`;
  }
}
