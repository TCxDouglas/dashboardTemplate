import { Dayjs } from 'dayjs';
import { Agent, AgentCompany } from './Agents';
import { Insured } from './Insured';
import { Plan } from './Plan';
import { Company } from './company';
import { Beneficiary } from './Beneficiary';
import { Address } from './Address';
import { TypePeriod } from '@/constants/constants';

export interface Insurance {
  id: number;
  policy: string;
  date: string;
  paymentPeriod: TypePeriod;
  paymentDate: string;
  lastPaymentDate: string;
  nextPaymentDate: string;
  premium: number;
  total: number;
  active: boolean;
  expired: boolean;
  deceased: boolean;
  createdAt: string;
  updatedAt: string;
  paidOff: boolean;
  temporal: boolean;
  agent?: Agent;
  companyPlan?: Plan;
  company?: Company;
  insured?: Insured;
  agentCompany?: AgentCompany;
  insuranceComments?: InsuranceComment[];
  beneficiaries?: Beneficiary[];
  address?: Address;
}

export interface InsuranceComment {
  id: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
export interface InsuranceForm {
  deceased: boolean;
  document: string;
  name: string;
  lastname: string;
  email: string;
  fax: string;
  active: boolean;
  policy: string;
  address?: string;
  date: Dayjs;
  company: number | undefined;
  companyPlan: number | undefined;
  temporal: boolean;
  agent: number | undefined;
  paymentPeriod: string;
  paymentDate: Dayjs;
  lastPaymentDate: Dayjs;
  premium: number;
  total: number;
  paidOff: boolean;
  activeInsured: boolean;
  expired: boolean;
  agentEmail?: string;
  dateBirthd?: Dayjs;
}

export interface InsuranceBackup {
  email: string;
  name: string;
  lastname: string;
  policy: string;
}
