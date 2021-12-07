import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { PaymentMethodService } from 'src/app/shared/services/payment-method.service';
import { Sales } from '../interfaces/sales';
import { CustomerService } from './../../../../shared/services/customer.service';
import { SalesService } from './../services/sales.service';


@Injectable()
export class SalesDetailsGuard implements Resolve<Sales | null > {
  constructor(
    protected activetedRoute: ActivatedRoute,
    protected customerService: CustomerService,
    protected paymentService: PaymentMethodService,
    protected salesService: SalesService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Sales> | null {
    let id = route.paramMap.get('salesId') ?? '';
    let paymentId = 0;

    return this.salesService.getById(+id).pipe(
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
      )
    )
  }
}
