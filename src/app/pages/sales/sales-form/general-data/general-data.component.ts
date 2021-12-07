import { Component, Input, OnInit } from '@angular/core';
import { PoDynamicFormField, PoSelectOption } from '@po-ui/ng-components';
import { forkJoin } from 'rxjs';

import { CustomerService } from 'src/app/shared/services/customer.service';
import { PaymentMethodService } from 'src/app/shared/services/payment-method.service';
import { Sales } from '../../shared/interfaces/sales';
import { SalesService } from '../../shared/services/sales.service';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html'
})
export class GeneralDataComponent implements OnInit {
  @Input() sales: Sales | undefined;
  fields: Array<PoDynamicFormField> = [];
  isLoading = true;

  constructor(
    protected customerService: CustomerService,
    protected paymentService: PaymentMethodService,
    protected salesService: SalesService,
  ) { }

  ngOnInit(): void {
    this.getFields();
  }

  getFields(): void {
    let customerList: Array<PoSelectOption>;
    let paymentList: Array<PoSelectOption>;

    forkJoin({
      customers: this.customerService.getAll(),
      payments: this.paymentService.getAll()
    })
    .subscribe( response => {
      customerList = this.customerService.getComboOptions(response.customers);
      paymentList = this.paymentService.getComboOptions(response.payments);
      this.fields = this.salesService.getFormFields();

      this.isLoading = false;

      this.fields[0].options = customerList;
      this.fields[2].options = paymentList;
    })
  }

}
