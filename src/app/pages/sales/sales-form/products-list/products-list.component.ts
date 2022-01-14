import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import {
  PoInfoOrientation,
  PoListViewAction,
  PoModalAction,
  PoModalComponent,
  PoNotificationService
} from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { SalesItem } from '../../shared/interfaces/sales-item';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnDestroy {
  @Input() products$ = new Subscription();
  @Output() changeItems = new EventEmitter();
  isHidden = false;
  stopRequest = false;
  products: Product[] = [];
  isLoading = false;
  min = 0;
  max = 99;
  orientation: PoInfoOrientation = PoInfoOrientation.Horizontal;

  @ViewChild('detailsModal', { static: true })
  detailsModalElement!: PoModalComponent;
  price!: number;
  quantity!: number;
  total!: number;
  itemId = 0;
  productId!: number;

  primaryAction: PoModalAction = {
    action: () => {
      this.addProduct();
    },
    label: 'Salvar',
    disabled: true,
  };

  readonly cancelAction: PoModalAction = {
    action: () => {
      this.detailsModalElement.close();
    },
    label: 'Cancelar',
  };

  readonly actions: Array<PoListViewAction> = [
    {
      label: 'Remover',
      action: this.onRemoveProduct.bind(this),
      type: 'danger',
      icon: 'po-icon-delete',
    },
  ];

  constructor(
    protected productService: ProductService,
    protected poNotification: PoNotificationService
  ) {}

  ngOnDestroy(): void {
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
    this.poNotification.success('Produtos Carregados');
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
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.canShowButton(false);
          window.navigator.vibrate(2000);
        })
      )
      .subscribe((products) => {
        this.products = this.products.concat(products);
      });
  }

  showModal(product: Product): void {
    this.onReset();
    this.productId = product.id;
    this.price = product.price;
    this.detailsModalElement.open();
  }

  onPriceChange(quantity: number): void {
    if (quantity) {
      this.total = this.price * quantity;
      this.primaryAction.disabled = false;
    } else {
      this.total = 0;
      this.primaryAction.disabled = true;
    }
  }

  addProduct(): void {
    this.itemId++;
    const item: SalesItem = {
      salesId: 0,
      itemId: this.itemId,
      productId: this.productId,
      value: this.price,
      quantity: this.quantity,
      amount: this.total,
      id: 0,
    };
    this.onReset();
    this.changeItems.emit(item);
    this.poNotification.success('Produto adicionado com sucesso');
    this.detailsModalElement.close();
  }

  onReset(): void {
    this.quantity = 0;
    this.total = 0;
    this.primaryAction.disabled = true;
  }

  onRemoveProduct(product: Product): void {
    const index = this.products.findIndex((item) => product.id === item.id);
    this.products.splice(index, 1);
  }

  onSearch(search: string): void {
    if (search) {
    this.products = this.products.filter(
      (product) =>
        product.id.toString().includes(search) ||
        product.description.toLocaleLowerCase().includes(search.toLowerCase())
    );
    } else {
      this.products = [];
      this.getProductsList();
    }
  }
}
