import { AppointmentStatus } from '../../../types/appointment-status.type';
import { IClientResponse } from '../clients/IClient.response';
import { IResponse } from '../IResponse.response';
import { INurseResponse } from '../nurses/INurse.response';
import { IPatientResponse } from '../patients/IPatient.response';
import { ICommentResponse } from './IComment.response';

export interface IAppointmentResponse extends IResponse {
  tittle: string;
  description: string;
  start_datetime: Date;
  end_datetime: Date;
  status: AppointmentStatus;
  client_id: string;
  client: IClientResponse;
  nurses: INurseResponse[];
  patients: IPatientResponse[];
  comments: ICommentResponse[];
}
