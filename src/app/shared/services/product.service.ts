
import { Injectable, Injector } from '@angular/core';
import { PoSelectOption } from '@po-ui/ng-components';

import { BaseResourceService } from './base-resource.service';
import { Product } from './../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseResourceService<Product>{
  constructor(
    protected injector: Injector
  ) {
    super('api/products/', injector);
  }

  getComboOptions(products: Product[]): PoSelectOption[] {
    return products.map(product => ({
      value: product.id,
      label: product.description
    }))
  }

}
