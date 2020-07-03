export enum Role {
  USER,
  ADMIN
}

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
  roomId?: number;
  role?: Role;
}

/**
 * Used for User edition
 */
export interface UserEdit {
  firstname?: string;
  lastname?: string;
  birthdate?: Date;
  biography?: string;
  location?: string;
}