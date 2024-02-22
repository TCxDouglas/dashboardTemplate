import { Roles } from '@/constants/constants';

export interface Rol {
  id: number;
  name: string;
  type: Roles;
  description: string;
  createdAt: string;
  updatedAt: string;
}
