import { Injectable, Injector } from '@angular/core';
import { PoSelectOption } from '@po-ui/ng-components';

import { BaseResourceService } from './base-resource.service';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseResourceService<Customer> {
  constructor(
    protected injector: Injector
  ) {
    super('api/customer/', injector);
  }

  getComboOptions(customers: Customer[]): PoSelectOption[] {
    return customers.map(customer => ({
      value: customer.id,
      label: customer.name
    }))
  }
}
