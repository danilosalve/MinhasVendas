import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { tap, switchMap, take, map, mergeMap } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { PoDynamicViewField } from '@po-ui/ng-components';

import { ProductService } from './../../../../shared/services/product.service';
import { SalesItem } from '../../shared/interfaces/sales-item';
import { SalesItemService } from '../../shared/services/sales-item.service';


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
})
export class ItemDetailComponent implements OnInit {
  items: SalesItem[] = [];
  fields: PoDynamicViewField[] = [];
  isLoading!: boolean;

  constructor(
    protected route: ActivatedRoute,
    protected productService: ProductService,
    protected salesItemService: SalesItemService
  ) {}

  ngOnInit(): void {
    this.getFields();
    this.loadItems();
  }

  getFields(): void {
    this.fields = this.salesItemService.getViewFields();
  }

  loadItems(): void {
    this.route.paramMap
      .pipe(
        tap(() => (this.isLoading = true)),
        switchMap((params: ParamMap) =>
          this.salesItemService.getAll().pipe(
            take(1),
            map(
              (salesItems) =>
                (salesItems = salesItems.filter(
                  (item) => item.salesId === +params.getAll('salesId')
                ))
            ),
            mergeMap((salesItems: SalesItem[]) => {
              const productsList$: Observable<SalesItem>[] = [];
              salesItems.forEach((item: SalesItem) => {
                const product$: Observable<SalesItem> = this.productService
                  .getById(item.productId)
                  .pipe(
                    map((product) => {
                      return { ...item, productName: product.description };
                    })
                  );
                productsList$.push(product$);
              });
              return forkJoin(productsList$);
            })
          )
        ),
        tap(() => (this.isLoading = false))
      )
      .subscribe((items) => {
        this.items = items;
      });
  }
}
