export interface IUpdateAppointmentRequest {
  tittle: string;
  description: string;
  start_datetime: Date;
  end_datetime: Date;
  nurses_ids: string[];
  patients_ids: string[];
}
