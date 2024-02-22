export interface Charge {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  index: number;
  agentReceipt: boolean;
}

export interface ChargeForm {
  name: string;
  description: string;
  active: boolean;
  agentReceipt: boolean;
}
