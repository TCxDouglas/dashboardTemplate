import { Rol } from './Rol';

export interface User {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  createdAt: string;
  updatedAt: string;
  role?: Rol;
}

export interface userResponse {
  jwt: string;
  user: User;
}
