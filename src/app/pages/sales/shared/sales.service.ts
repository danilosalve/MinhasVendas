import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoComboOption, PoDynamicFormField, PoTableColumn } from '@po-ui/ng-components';
import { Observable, of, throwError, forkJoin } from 'rxjs';
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
          status: sale.status
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
      { property: 'status', label: 'Status', type: 'label', labels: [
        { value: 'A', color: 'color-11', label: 'Aberto' },
        { value: 'E', color: 'color-07', label: 'Encerrado' },
      ] },
    ];
  }

  getFields(): Array<PoDynamicFormField> {
    let customerList:PoComboOption[];
    forkJoin({
      customers: this.customerService.getAll()
    }).subscribe( response => {
      customerList = this.customerService.getCustomerComboOptions(response.customers);
    })

    return [
        {
          label: 'Cliente',
          property: 'customerId',
          gridColumns: 5,
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
          gridColumns: 3,
          gridSmColumns: 12
        }
      ]
  }
}
