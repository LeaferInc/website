export interface User {
  id?: number;
  createdAt?: Date;
  enabled?: boolean;
  email: string;
  username: string;
  firstname?: string;
  lastname?: string;
  birthdate?: Date;
  biography?: string;
  location?: string;
  pictureId?: number;
}
