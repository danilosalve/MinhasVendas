import { Component, OnInit } from '@angular/core';
import { PoNotificationService, PoTableColumn } from '@po-ui/ng-components';
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

  constructor(
    protected salesService: SalesService,
    protected customerService: CustomerService,
    protected poNotification: PoNotificationService
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
