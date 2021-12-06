import { SalesItem } from './sales-item';

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

export interface SalesOrder extends Sales {
  item: Array<SalesItem>;
}
