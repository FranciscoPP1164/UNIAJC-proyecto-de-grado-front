import { AlertType } from '../../types/alert.type';

export interface IAlertConfig {
  icon: AlertType;
  title: string;
  text?: string;
}
