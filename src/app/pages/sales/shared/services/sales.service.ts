
import { Injectable, Injector } from '@angular/core';
import { PoDynamicFormField, PoDynamicViewField, PoSelectOption, PoTableColumn } from '@po-ui/ng-components';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Sales } from '../interfaces/sales';

@Injectable({
  providedIn: 'root',
})
export class SalesService extends BaseResourceService<Sales> {
  constructor(
    protected injector: Injector
    ) {
      super('api/sales/', injector);
    }

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'id', label: 'Código', type: 'number', width: '8%' },
      { property: 'customerId', label: 'Cliente', type: 'number', visible: false },
      { property: 'customerName', label: 'Nome Cliente', type: 'string' },
      { property: 'issueDate', label: 'Dt. Emissão', type: 'dateTime' },
      { property: 'status', label: 'Status', type: 'label', labels: [
        { value: 'A', color: 'color-11', label: 'Aberto' },
        { value: 'E', color: 'color-07', label: 'Encerrado' },
      ]}
    ];
  }

  getFormFields(): Array<PoDynamicFormField> {
    let fields:  Array<PoDynamicFormField> = [
      {
        label: 'Cliente',
        property: 'customerId',
        gridColumns: 3,
        gridSmColumns: 12,
        gridMdColumns: 5,
        gridLgColumns: 4,
        gridXlColumns: 3,
        options: []
      },
      {
        label: 'Dt. Emissão',
        property: 'issueDate',
        type: 'date',
        format: 'mm/dd/yyyy',
        gridColumns: 2,
        gridSmColumns: 12,
        gridMdColumns: 3,
        gridLgColumns: 3,
        gridXlColumns: 2,
      },
      {
        label: 'Cond. Pagamento',
        property: 'paymentMethodId',
        gridColumns: 3,
        gridSmColumns: 12,
        gridMdColumns: 5,
        gridLgColumns: 4,
        gridXlColumns: 3,
        options: []
      }
    ];
    return fields
  }

  getViewFields(): PoDynamicViewField[] {
    return [
      { property: 'id', label: 'Núm. Pedido', divider: 'Dados Gerais' },
      { property: 'customerId', label: 'Código Cliente' },
      { property: 'customerName', label: 'Nome do Cliente', type: 'string' },
      { property: 'issueDate', label: 'Dt. Emissão', type: 'date' },
      { property: 'paymentMethodId', label: 'Cond. Pagamento' },
      { property: 'paymentMethodDescription', label: 'Desc. Pagamento' },
      { property: 'status', label: 'Status',  tag: true, color: 'color-11', icon: 'po-icon-ok'},
    ]
  }
}
