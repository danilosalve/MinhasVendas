import { Injectable, Injector } from '@angular/core';
import { PoDynamicViewField } from '@po-ui/ng-components';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { SalesItem } from '../interfaces/sales-item';

@Injectable({
  providedIn: 'root'
})
export class SalesItemService extends BaseResourceService<SalesItem> {
  constructor(
    protected injetor: Injector
  ) {
    super('api/salesItems/', injetor);
  }

  getViewFields(): PoDynamicViewField[] {
    return [
      { property: 'itemId', label: 'Item', tag: true, color: 'color-11' },
      { property: 'productId', label: 'Cód. Produto'},
      { property: 'productName', label: 'Desc. Produto'},
      { property: 'value', label: 'Valor Unitario', type: 'currency'},
      { property: 'quantity', label: 'Quantidade'},
      { property: 'amount', label: 'Valor Total', type: 'currency'}
    ]
  }
}
