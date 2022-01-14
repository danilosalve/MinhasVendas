import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoNotificationService } from '@po-ui/ng-components';
import { of, Subscription } from 'rxjs';
import { retry, switchMap, take, tap } from 'rxjs/operators';
import { Sales } from '../shared/interfaces/sales';
import { SalesItem } from './../shared/interfaces/sales-item';
import { SalesItemService } from './../shared/services/sales-item.service';
import { SalesService } from './../shared/services/sales.service';
@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
})
export class SalesFormComponent implements OnInit {
  products$ = new Subscription();
  sales: Sales = {
    customerId: 0,
    paymentMethodId: 0,
    issueDate: new Date(),
    status: 'A',
  };
  salesItems: SalesItem[] = [];
  isDisableSubmit = true;
  itemId = 0;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Meus Pedidos', action: this.cancel.bind(this) },
      { label: 'Novo Pedido' },
    ],
  };

  constructor(
    protected router: Router,
    protected poNotification: PoNotificationService,
    protected salesService: SalesService,
    protected itemService: SalesItemService
  ) {}

  ngOnInit(): void {
    this.getLastItemId();
  }

  cancel(): void {
    this.router.navigate(['sales']);
  }

  addSalesItem(salesItem: SalesItem): void {
    this.isDisableSubmit = false;
    salesItem.id = ++this.itemId;
    this.salesItems = this.salesItems.concat(salesItem);
  }

  getLastItemId(): void {
    this.itemService
      .getAll()
      .pipe(retry(2), take(1))
      .subscribe((items) =>
        items ? (this.itemId = items[items.length - 1].id) : 0
      );
  }

  onSubmit(): void {
    this.salesService
      .create(this.sales)
      .pipe(
        tap((res) => this.updateSalesIdOnItems(res.id)),
        switchMap((sales) => {
          this.salesItems.forEach((item) =>
            this.itemService.create(item).subscribe(
              (res) => console.log('salvei o item:', res),
              () => this.poNotification.error('Falha ao incluir Pedido')
            )
          );
          return of([sales, this.salesItems]);
        })
      )
      .subscribe(
        () => this.router.navigate(['sales']),
        () => this.poNotification.error('Falha ao incluir Pedido')
      );
  }

  updateSalesIdOnItems(id: number): void {
    this.salesItems.forEach((item) => (item.salesId = id));
  }
}
