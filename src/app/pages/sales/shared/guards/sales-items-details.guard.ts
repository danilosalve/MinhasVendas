import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/services/product.service';
import { SalesItem } from '../interfaces/sales-item';
import { SalesItemService } from '../services/sales-item.service';

@Injectable()
export class SalesItemsDetailsGuard implements Resolve<SalesItem[] | null > {
  constructor(
    protected activetedRoute: ActivatedRoute,
    protected productService: ProductService,
    protected salesItemService: SalesItemService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<SalesItem[]> | null {
    let id = route.paramMap.get('salesId') ?? '';

    return this.salesItemService.getAll().pipe(
      take(1),
      map(
        (salesItems) =>
          (salesItems = salesItems.filter(
            (item) => item.salesId === +id
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
  }
}
