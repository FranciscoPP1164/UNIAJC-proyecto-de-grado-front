import { IAlertConfig } from './IAlert.config';

export interface IAlertConfirmConfig extends IAlertConfig {
  confirmButtonText: string;
  cancelButtonText: string;
}
