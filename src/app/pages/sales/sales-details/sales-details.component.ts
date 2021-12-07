import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PoDynamicViewField,
  PoNotificationService
} from '@po-ui/ng-components';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { PaymentMethodService } from 'src/app/shared/services/payment-method.service';
import { Sales } from '../shared/interfaces/sales';
import { SalesItemService } from '../shared/services/sales-item.service';
import { SalesService } from './../shared/services/sales.service';


@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
})
export class SalesDetailsComponent implements OnInit {
  fields: PoDynamicViewField[] = [];
  sale!: Sales;

  constructor(
    protected poNotification: PoNotificationService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected customerService: CustomerService,
    protected paymentService: PaymentMethodService,
    protected salesService: SalesService,
    protected salesItemService: SalesItemService
  ) {}

  ngOnInit(): void {
    this.getFields();
    this.loadSale();
  }

  getFields(): void {
    this.fields = this.salesService.getViewFields();
  }

  loadSale(): void {
    this.sale = this.activatedRoute.snapshot.data['sale'];

    if (this.sale.status === 'A') {
      this.sale.status = 'Aberto';
    } else {
      this.sale.status = 'Encerrado';

      let index = this.fields.findIndex( field => field.property === 'status');
      if (index >= 0 ) {
        this.fields[index].color = 'color-07';
      }
    }
  }

  back(): void {
    this.router.navigate(['sales']);
  }
}
