
import { Injectable, Injector } from '@angular/core';
import { PoComboOption, PoDynamicFormField, PoTableColumn } from '@po-ui/ng-components';
import { forkJoin } from 'rxjs';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { PaymentMethodService } from 'src/app/shared/services/payment-method.service';
import { Sales } from '../interfaces/sales';

@Injectable({
  providedIn: 'root',
})
export class SalesService extends BaseResourceService<Sales> {
  constructor(
    protected injector: Injector,
    protected customerService: CustomerService,
    protected paymentService: PaymentMethodService
    ) {
      super('api/sales/', injector);
    }

  getComboOptions(resources: Sales[]): PoComboOption[] {
    throw new Error('Method not implemented.');
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
      ] },
    ];
  }

  getFields(): Array<PoDynamicFormField> {
    let customerList:PoComboOption[];
    forkJoin({
      customers: this.customerService.getAll(),
      payments: this.paymentService.getAll()
    }).subscribe( response => {
      customerList = this.customerService.getComboOptions(response.customers);
    })

    return [
        {
          label: 'Cliente',
          property: 'customerId',
          gridColumns: 3,
          options: [
            { value: 2, label: 'Ted Mosby' },
            { value: 3, label: 'Robin Scherbatsky' },
            { value: 4, label: 'Lily Aldrin' },
            { value: 5, label: 'Marshall Eriksen' },
            { value: 6, label: 'Zoey Pierson' },
            { value: 7, label: 'Victoria' },
            { value: 8, label: 'Stella Zinman' },
            { value: 9, label: 'Ranjit' },
            { value: 10, label: 'Sandy Rivers' },
            { value: 11, label: 'James Stinson' },
            { value: 12, label: 'Mickey Aldrin' }
          ]
        },
        {
          label: 'Dt. Emissão',
          property: 'issueDate',
          type: 'date',
          format: 'mm/dd/yyyy',
          gridColumns: 2,
          gridSmColumns: 12
        },
        {
          label: 'Cond. Pagamento',
          property: 'paymentMethodId',
          gridColumns: 3,
          options: [
            { value: 1, label: 'A Vista' },
            { value: 2, label: 'A prazo 30 Dias' },
            { value: 3, label: '3x - 30, 60 e 90' },
            { value: 4, label: 'Pagamento Antecipado' },
            { value: 5, label: '2x - 0 + 30 dias' },
          ]
        }
      ]
  }
}
