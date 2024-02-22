export interface Plan {
  id: number;
  name: string;
  active: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlanForm {
  name: string;
  description: string;
  active: boolean;
}

export interface PlanCache extends PlanForm {
  uid: string;
}
