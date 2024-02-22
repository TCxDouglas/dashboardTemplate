import { TypePhone } from './TypePhone';

export interface Contact {
  id: number;
  number: string;
  active: boolean;
  phoneType: TypePhone;
  createdAt: string;
  updatedAt: string;
}

export type ModeRow = 'edit' | 'save';
export interface ContactCache {
  uid: string;
  number: string;
  active: boolean;
  modeRow: ModeRow;
  typePhone?: TypePhone;
  newRow?: boolean;
}
