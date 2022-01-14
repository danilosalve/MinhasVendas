import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Sales } from '../shared/interfaces/sales';
import { SalesItem } from './../shared/interfaces/sales-item';


@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html'
})
export class SalesFormComponent {
  products$ = new Subscription();
  sales: Sales = {
    customerId: 0,
    paymentMethodId: 0,
    issueDate: new Date(),
    status: 'A'
  };
  salesItems: SalesItem[] = [];

  constructor(
    protected router: Router,
    ) { }

  back(): void {
    this.router.navigate(['sales']);
  }

  addSalesItem(salesItem: SalesItem): void {
    this.salesItems = this.salesItems.concat(salesItem);
  }
}
