import { AlertsType } from '../../types/alerts.type';

export interface IAlertsConfig {
  icon: AlertsType;
  title: string;
  text?: string;
}
