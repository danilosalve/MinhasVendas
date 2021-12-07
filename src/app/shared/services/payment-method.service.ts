import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from './base-resource.service';
import { PaymentMethod } from '../interfaces/paymentMethod';
import { PoSelectOption } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService extends BaseResourceService<PaymentMethod> {
  constructor(
    protected injector: Injector
  ) {
    super('api/paymentMethod/', injector);
  }

  getComboOptions(payments: PaymentMethod[]): PoSelectOption[] {
    return payments.map(payment => ({
      value: payment.id,
      label: payment.description
    }))
  }
}
