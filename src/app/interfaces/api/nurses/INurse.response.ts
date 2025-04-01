import { Genre } from '../../../types/genre.type';
import { Status } from '../../../types/status.type';
import { IResponse } from '../IResponse.response';

export interface INurseResponse extends IResponse {
  name: string;
  genre: Genre;
  email: string;
  phone: string;
  document_identification: string;
  status: Status;
}
