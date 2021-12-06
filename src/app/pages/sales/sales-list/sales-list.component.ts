import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  PoNotificationService,
  PoPageAction,
  PoTableColumn,
} from '@po-ui/ng-components';
import { of, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { CustomerService } from 'src/app/shared/services/customer.service';
import { SalesBrw } from '../shared/sales';
import { SalesService } from './../shared/sales.service';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css'],
})
export class SalesListComponent implements OnInit, OnDestroy {
  salesItems: SalesBrw[] = [];
  columns: Array<PoTableColumn> = [];
  isLoading = true;
  actions: Array<PoPageAction> = [
    { label: 'Novo', url: 'sales/new', icon: 'po-icon-plus' },
  ];
  sales$ = new Subscription();

  constructor(
    protected salesService: SalesService,
    protected customerService: CustomerService,
    protected poNotification: PoNotificationService,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.getSales();
    this.columns = this.getColumns();
  }

  ngOnDestroy(): void {
    this.sales$.unsubscribe();
  }

  getSales(search?: string): void {
      let salesBrw: SalesBrw[] = [];

      this.sales$ = this.salesService.getAll()
      .pipe(
        tap(() => {
          this.salesItems = [];
          this.isLoading = true
        }),
        switchMap((sales:SalesBrw[] ) => {
          sales.forEach(sale => {
            this.customerService.getById(sale.customerId).pipe(
              map(customer => ({
                ...sale,
                customerName: customer.name
              })),
              tap(saleBrw => {
                this.salesItems = this.salesItems.concat(saleBrw)
              }),
              tap(() => this.isLoading = false)
            )
            .subscribe(() => {
              if (search) {
                this.salesItems = this.salesItems
                  .filter(sales =>
                    sales.id?.toString().includes(search) ||
                    sales.customerName?.toLowerCase().includes(search.toLowerCase())
                  )
              }
            })
          })
          return of(salesBrw)
        })
        ).subscribe()
  }

  getColumns(): Array<PoTableColumn> {
    return this.salesService.getColumns();
  }

  searchSales(search: string): void {
    this.getSales(search);
  }
}
