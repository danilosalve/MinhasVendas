import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PoInfoOrientation, PoNotificationService } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnDestroy {
  @Input() products$ = new Subscription();

  isHidden = false;
  stopRequest = false;
  products: Product[] = [];
  isLoading = false;

  constructor(
    protected productService: ProductService,
    protected poNotification: PoNotificationService
  ) {}

  orientation: PoInfoOrientation = PoInfoOrientation.Horizontal;

  ngOnDestroy(): void {
    console.log('passei no destroy');
    this.products$.unsubscribe();
  }

  buttonStopRequest(): void {
    this.products$.unsubscribe();
    this.isLoading = false;
    this.canShowButton(false);
    this.stopRequest = true;
  }

  buttonRequest(): void {
    this.canShowButton(true);
    this.getProductsList();
  }

  buttonClear(): void {
    this.products.splice(0, this.products.length);
  }

  canShowButton(isShow: boolean): void {
    this.isHidden = isShow;
  }

  getProductsList(): void {
    this.isLoading = true;
    this.products$ = this.productService
      .getAll()
      .subscribe((products) => {
        this.products = this.products.concat(products);
        this.isLoading = false;
        this.canShowButton(false);
        this.poNotification.success('Produtos Carregados');
      });
  }
}
