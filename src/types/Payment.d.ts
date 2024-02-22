import { Charge } from './Charge';
import { Insurance } from './Insurances';
import { PaymentComment } from './PaymentComment';
import { ReceiptInfo } from './Receipt';

export interface PaymentCharges {
  id: number;
  percentage: number;
  total: number;
  charge?: Charge;
  createdAt: string;
  updatedAt: string;
}
export type StatePayment = 'unpaid' | 'paid';
export interface Payment {
  id: number;
  agency: string;
  correlative: number;
  oldCorrelative: number;
  operation: string;
  oldBalance: number;
  amount: number;
  balance: number;
  date: string;
  from: string;
  to: string;
  deliveryNumber: string;
  state: StatePayment;
  fee: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  insurance?: Insurance;
  relatedPayment: null;
  paymentComments?: PaymentComment[];
  paymentCharges?: PaymentCharges[];
  receipt?: ReceiptInfo;
  agentReceipt?: ReceiptInfo;
}
export interface PaymentForm {
  policy: string;
  name: string;
  code: string;
  nameAgent: string;
  plan: string;
  company: string;
  operation: string;
  value: string;
  numberSend: string;
  date: string;
  comment: string;
}

export interface PeriodPayment {
  value?: number;
  from: string;
  to: string;
  first?: boolean;
}

export interface PaymentFilter {
  status?: StatePayment;
  company?: number;
  date?: {
    from: string;
    to: string;
  };
  type?: string;
}
