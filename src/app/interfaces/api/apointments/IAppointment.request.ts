import { IPatientRequest } from "../patients/IPatient.request";

export interface IAppointmentRequest {
  tittle: string;
  description: string;
  start_datetime: Date;
  end_datetime: Date;
  client_id: string;
  nurses_ids: string[];
  patients_ids: string[];
}
