export interface Sales {
  id: number;
  customerId: number;
  paymentMethodId: number;
  issueDate: Date;
}

export interface SalesBrw {
  id: number;
  customerId: number;
  customerName?: string;
  paymentMethodId: number;
  issueDate: Date;
}
