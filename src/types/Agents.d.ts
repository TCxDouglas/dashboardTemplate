import { Company } from './company';

export interface Agent {
  id: number;
  name: string;
  email: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  agentCompanies?: AgentCompany[];
}

export interface AgentForm {
  name: string;
  email: string;
  active: boolean;
  agentCompanies?: AgentCompanyForm[];
}

export interface AgentsFilter {
  status?: boolean;
  company?: number;
}

export interface AgentCompany {
  id: number;
  code: string;
  createdAt: string;
  updatedAt: string;
  company?: Company;
  agent?: Agent;
}

export interface AgentCompanyForm {
  code: string;
  company: Company | undefined;
  idCompany: number | undefined;
}

export interface AgentCompanyCache extends AgentCompanyForm {
  uid: string;
}
