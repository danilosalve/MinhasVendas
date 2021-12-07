import { BaseResource } from './../../../../shared/interfaces/BaseResource';

export interface SalesItem extends BaseResource{
  salesId: number;
  itemId: number;
  productId: number;
  value: number;
  quantity: number;
  amount: number,
  productName?: string;
}
