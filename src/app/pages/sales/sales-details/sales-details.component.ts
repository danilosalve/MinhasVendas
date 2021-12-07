import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  PoDynamicViewField,
  PoNotificationService,
} from '@po-ui/ng-components';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { CustomerService } from 'src/app/shared/services/customer.service';
import { PaymentMethodService } from 'src/app/shared/services/payment-method.service';
import { Sales } from '../shared/interfaces/sales';
import { SalesService } from './../shared/services/sales.service';

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
})
export class SalesDetailsComponent implements OnInit {
  fields: PoDynamicViewField[] = [];
  sale!: Sales;
  isLoading = true;

  constructor(
    protected poNotification: PoNotificationService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected customerService: CustomerService,
    protected paymentService: PaymentMethodService,
    protected salesService: SalesService,
  ) {}

  ngOnInit(): void {
    this.getFields();
    this.loadSale();
  }

  getFields(): void {
    this.fields = this.salesService.getViewFields();
  }

  loadSale(): void {
    let paymentId = 0;
    this.route.paramMap
      .pipe(
        tap(() => this.isLoading = true),
        switchMap((params: ParamMap) =>
          this.salesService.getById(+params.getAll('salesId')).pipe(
            take(1),
            switchMap( (sale: Sales) =>
              this.customerService.getById(sale.customerId)
                .pipe(
                  map(customer => ({
                    ...sale,
                    customerName: customer.name
                  }))
                )
            ),
            tap(
              sale => paymentId = sale.paymentMethodId ? sale.paymentMethodId : 0
            ),
            switchMap( sale =>
              this.paymentService.getById(paymentId).pipe(
                map( payment => ({
                  ...sale,
                  paymentMethodDescription: payment.description
                }))
              )
            ),
          )
        ),
        tap(() => this.isLoading = false),
      )
      .subscribe(
        (sale) => {
          this.sale = sale;
          if (this.sale.status === 'A') {
            this.sale.status = 'Aberto';
          } else {
            this.sale.status = 'Encerrado';
            this.fields[4].color = 'color-07';
          }
        },
        () => this.poNotification.error('Falha ao obter Venda')
      );
  }

  back(): void {
    this.router.navigate(['sales']);
  }
}
