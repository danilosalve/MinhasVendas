import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService, PoPageAction, PoTableColumn } from '@po-ui/ng-components';
import { switchMap, take } from 'rxjs/operators';

import { CustomerService } from 'src/app/shared/services/customer.service';
import { SalesBrw } from '../shared/sales';
import { SalesService } from './../shared/sales.service';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css'],
})
export class SalesListComponent implements OnInit {
  salesItems: SalesBrw[] = [];
  columns: Array<PoTableColumn> = [];
  isLoading = true;
  actions: Array<PoPageAction> = [
    {label: 'Novo', url: 'sales/new', icon: 'po-icon-plus'}
  ];

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

  getSales(): void {
    this.salesService.getAllWithCustomers()
      .pipe(
        switchMap(sales => this.salesItems = sales),
        take(1),
      )
      .subscribe();
  }

  getColumns(): Array<PoTableColumn> {
    return this.salesService.getColumns();
  }
}
