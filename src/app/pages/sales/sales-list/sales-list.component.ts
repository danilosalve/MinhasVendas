import { Sales } from './../shared/interfaces/sales';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  PoNotificationService,
  PoPageAction,
  PoTableAction,
  PoTableColumn,
} from '@po-ui/ng-components';
import { of, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { CustomerService } from 'src/app/shared/services/customer.service';
import { SalesBrw } from '../shared/interfaces/sales';
import { SalesService } from '../shared/services/sales.service';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html'
})
export class SalesListComponent implements OnInit, OnDestroy {
  columns: Array<PoTableColumn> = [];
  isLoading = true;
  salesItems: SalesBrw[] = [];
  sales$ = new Subscription();
  actions: Array<PoPageAction> = [
    { label: 'Novo', url: 'sales/new', icon: 'po-icon-plus' },
  ];
  actionsSales: Array<PoTableAction> = [
    {
      action: this.showSale.bind(this),
      icon: 'po-icon po-icon-edit',
      label: 'Editar'
    },
    {
      action: this.showSale.bind(this),
      icon: 'po-icon-eye',
      label: 'Visualizar'
    }
  ]

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

  showSale(sale: Sales): void {
    this.isLoading = true;
    this.router.navigate(['sales/view', sale.id]);
  }
}
