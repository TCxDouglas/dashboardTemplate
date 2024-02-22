export interface PaymentComment {
  id: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentCache {
  uid: string;
  comment: string;
}

export interface CommentForm {
  comment: string;
}
