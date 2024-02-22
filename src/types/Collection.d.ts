import { Dayjs } from 'dayjs';
import { Agent } from './Agents';
import { Company } from './company';
import { ReceiptInfo } from './Receipt';

export interface Collection {
  id: number;
  from: string;
  to: string;
  insurances: number;
  createdAt: string;
  updatedAt: string;
  agent?: Agent;
  company?: Company;
  file?: ReceiptInfo;
}

export interface CollectionForm {
  company?: number;
  agent?: number;
  month?: Dayjs;
}

export interface CollectionFilter {
  company?: number;
  agent?: number;
  month?: number;
}
