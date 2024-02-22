import { ModeRow } from './Contacts';

export interface Beneficiary {
  id: number;
  name: string;
  active: boolean;
  percentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface BeneficiaryCache {
  uid: string;
  name: string;
  active: boolean;
  percentage: string;
  modeRow: ModeRow;
  newRow?: boolean;
}
