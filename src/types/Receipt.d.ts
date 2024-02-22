export interface Receipt {
  id: number;
  receipt?: ReceiptInfo;
  agentReceipt?: ReceiptInfo;
}

export interface ReceiptInfo {
  id: number;
  url: string;
}

export interface SendEmailForm {
  email: string;
  custom: boolean;
}
