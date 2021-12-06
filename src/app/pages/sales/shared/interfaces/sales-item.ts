import { BaseResource } from './../../../../shared/interfaces/BaseResource';

export interface SalesItem extends BaseResource{
  salesId: number;
  productId: number;
  value: number;
  quantity: number;
  amount: number
}
