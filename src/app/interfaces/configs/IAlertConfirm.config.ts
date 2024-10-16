import { IAlertsConfig } from './IAlerts.config';

export interface IAlertConfirmConfig extends IAlertsConfig {
  confirmButtonText: string;
  cancelButtonText: string;
}
