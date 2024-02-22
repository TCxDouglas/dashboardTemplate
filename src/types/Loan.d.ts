import { Dayjs } from 'dayjs';
import { Insurance } from './Insurances';
import { ReceiptInfo } from './Receipt';

export interface Loan {
  id: number;
  correlative: number;
  oldCorrelative: number;
  operation: string;
  amount: number;
  date: string;
  report: number;
  createdAt: string;
  updatedAt: string;
  insurance?: Insurance;
  loanComments?: LoanComment[];
  receipt?: ReceiptInfo;
  agentReceipt?: ReceiptInfo;
}

export interface LoanComment {
  id: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoanForm {
  operation: string;
  amount: number;
  date: Dayjs;
  report: number;
  policy: string;
  insurance?: number;
}

export interface LoanFilter {
  date?: string;
}
