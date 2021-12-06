import { Component, OnDestroy, OnInit, NgZone } from '@angular/core';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { PoChartSerie, PoChartType, PoGaugeRanges } from '@po-ui/ng-components';

import { SalesService } from './../../sales/shared/sales.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  sales$ = new Subscription();
  closedSales = 0;
  openSales = 0;
  typeChart: PoChartType = PoChartType.Donut;
  sales: Array<PoChartSerie> = [
    { label: 'Aberto', data: 0, tooltip: 'Pedidos em aberto' },
    { label: 'Encerrado', data: 0, tooltip: 'Pedidos Encerrados' },
  ];
  isLoading = true;

  salesRanges: Array<PoGaugeRanges> = [
    { from: 0, to: 0, label: 'Baixo', color: '#c64840' },
    { from: 0, to: 1, label: 'Médio', color: '#ea9b3e' },
    { from: 0, to: 2, label: 'Alto', color: '#00b28e' },
  ];

  constructor(
    protected salesService: SalesService,
    protected router: Router,
    protected ngZone: NgZone
  ) {}

  ngOnInit() {
    this.getSalesOrders();
  }

  ngOnDestroy(): void {
    this.sales$.unsubscribe();
  }

  getSalesOrders(): void {
    this.sales$ = this.salesService
      .getAll()
      .pipe(take(1))
      .subscribe(sales => {
        const totalSales = sales.length;
        const salesMedia = totalSales / 3;

        sales.forEach(sale => {
          this.closedSales += sale.status == 'A' ? 0 : 1;
          this.openSales += sale.status == 'A' ? 1 : 0;
          this.salesRanges[0].to = salesMedia;
          this.salesRanges[1].from = salesMedia;
          this.salesRanges[1].to = salesMedia * 2;
          this.salesRanges[2].from = salesMedia * 2;
          this.salesRanges[2].to = salesMedia * 3;
        });

        this.sales = [
          {
            label: 'Aberto',
            data: this.openSales,
            tooltip: 'Pedidos em aberto',
          },
          {
            label: 'Encerrado',
            data: this.closedSales,
            tooltip: 'Pedidos Encerrados',
          },
        ];

        this.isLoading = false;
      });
  }

  showMeSales(): void {
    this.ngZone.run(() => this.router.navigate(['/sales']));
  }
}
