import { Genre } from '../../../types/genre.type';
import { Status } from '../../../types/status.type';

export interface IUpdateNurseRequest {
  name?: string;
  genre?: Genre;
  email?: string;
  phone?: string;
  document_identification?: string;
  status?: Status;
}
