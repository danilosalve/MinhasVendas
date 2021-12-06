
import { Injectable, Injector } from '@angular/core';
import { PoComboOption } from '@po-ui/ng-components';

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

  getComboOptions(products: Product[]): PoComboOption[] {
    return products.map(product => ({
      value: product.id,
      label: product.description
    }))
  }

}
