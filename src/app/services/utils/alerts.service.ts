import { Injectable } from '@angular/core';
import { IAlertConfig } from '../../interfaces/configs/IAlert.config';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { IAlertConfirmConfig } from '../../interfaces/configs/IAlertConfirm.config';
import { IAlertAskConfig } from '../../interfaces/configs/IAlertAsk.config';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  public make(config: IAlertConfig): Promise<SweetAlertResult> {
    const alert = Swal.mixin({
      ...config,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    return alert.fire();
  }

  public confirm(config: IAlertConfirmConfig): Promise<SweetAlertResult> {
    const alert = Swal.mixin({
      ...config,
      showCancelButton: true,
      confirmButtonColor: '#1e40af',
      cancelButtonColor: '#dc2626',
    });

    return alert.fire();
  }

  public ask(config: IAlertAskConfig): Promise<SweetAlertResult> {
    const alert = Swal.mixin({
      ...config,
      showCancelButton: true,
      confirmButtonColor: '#1e40af',
      cancelButtonColor: '#dc2626',
    });

    return alert.fire();
  }
}
