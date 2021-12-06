import { BaseResource } from './BaseResource';
export interface Product extends BaseResource {
  description: string;
  price: number;
}
