import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, take } from 'rxjs/operators';

import { CustomerService } from 'src/app/shared/services/customer.service';
import { Sales, SalesBrw } from './sales';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  readonly apiPath = 'api/sales/';
  constructor(
    private http: HttpClient,
    private customerService: CustomerService
  ) {}

  getAll(): Observable<Sales[]> {
    return this.http.get<Sales[]>(this.apiPath).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  getById(id: number): Observable<Sales> {
    return this.http.get<Sales>(`${this.apiPath}/${id}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  getAllWithCustomers(): Observable<SalesBrw[]> {
    let salesBrw: SalesBrw[] = [];
    this.getAll()
    .pipe(take(1))
    .subscribe(result => {
      result.forEach((sale) => {
        let item: SalesBrw;
        item = {
          id: sale.id,
          issueDate: sale.issueDate,
          customerId: sale.customerId,
          paymentMethodId: sale.paymentMethodId,
        };
        this.customerService
          .getById(sale.customerId)
          .subscribe(res =>
            item.customerName = res.name,
            catchError((error: HttpErrorResponse) => {
              return throwError(error);
            })
          );
        salesBrw.push(item);
      });
    });
    return of(salesBrw);
  }

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'id', label: 'Código', type: 'number', width: '8%' },
      { property: 'customerId', label: 'Cliente', type: 'number', visible: false },
      { property: 'customerName', label: 'Nome Cliente', type: 'string' },
      { property: 'issueDate', label: 'Dt. Emissão', type: 'dateTime' },
    ];
  }
}
