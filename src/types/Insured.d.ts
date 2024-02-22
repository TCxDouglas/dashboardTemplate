import { Address } from './Address';
import { Contact } from './Contacts';

export interface Insured {
  id: number;
  document: string;
  name: string;
  lastname: string;
  country: string;
  countryId: number;
  city: string;
  cityId: number;
  state: string;
  stateId: number;
  address: string;
  email: string;
  fax: string;
  birthday: string;
  active: boolean;
  phones?: Contact[];
  addresses?: Address[];
  createdAt: string;
  updatedAt: string;
}

export interface InsuredFilter {
  company?: number;
  country?: string;
  status?: boolean;
  datePolice?: string;
  period?: string;
}
