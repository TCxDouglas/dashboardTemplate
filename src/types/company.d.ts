import { Plan, PlanForm } from './Plan';

export interface Company {
  id: number;
  name: string;
  code: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  companyPlans?: Plan[];
}

export interface CompanyForm {
  name: string;
  code: string;
  active: boolean;
  companyPlans?: PlanForm[];
  codeAgent?: string;
}

export interface CompanyFilter {
  status?: boolean;
}
