export interface Sales {
  id?: number;
  customerId: number;
  paymentMethodId?: number;
  issueDate: Date;
  status: string;
}

export interface SalesBrw extends Sales {
  customerName?: string;
}
