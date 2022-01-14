import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Sales } from './pages/sales/shared/interfaces/sales';
import { SalesItem } from './pages/sales/shared/interfaces/sales-item';
import { Customer } from './shared/interfaces/customer';
import { PaymentMethod } from './shared/interfaces/paymentMethod';
import { Product } from './shared/interfaces/product';


export class InMemoryDatabase implements InMemoryDbService {
  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    const customer: Customer[] = [
      { id: 1, name: 'Barney Stinson' },
      { id: 2, name: 'Ted Mosby' },
      { id: 3, name: 'Robin Scherbatsky' },
      { id: 4, name: 'Lily Aldrin' },
      { id: 5, name: 'Marshall Eriksen' },
      { id: 6, name: 'Zoey Pierson' },
      { id: 7, name: 'Victoria' },
      { id: 8, name: 'Stella Zinman' },
      { id: 9, name: 'Ranjit' },
      { id: 10, name: 'Sandy Rivers' },
      { id: 11, name: 'James Stinson' },
      { id: 12, name: 'Mickey Aldrin' },
    ];

    const products: Product[] = [
      { id:1, description: 'Pearl Jam', price: Math.random() * 100},
      { id:2, description: 'Alabama Shakes', price: Math.random() * 100},
      { id:3, description: 'The Black Keys', price: Math.random()* 100},
      { id:4, description: 'Queen', price: Math.random()* 100},
      { id:5, description: 'Five Finger Death Punch', price: Math.random()* 100},
      { id:6, description: 'System of a Down', price: Math.random()* 100},
      { id:7, description: 'Eagles of Death Metal', price: Math.random()* 100},
      { id:8, description: 'Weezer', price: Math.random()* 100},
      { id:9, description: 'Eddie Vedder', price: Math.random()* 100},
      { id:10, description: 'Oasis', price: Math.random()* 100},
      { id:11, description: 'Foo Fighters', price: Math.random()* 100},
      { id:12, description: 'Irá!', price: Math.random()* 100},
      { id:13, description: 'Capital Inicial', price: Math.random()* 100},
      { id:14, description: 'Titãs', price: Math.random()* 100},
      { id:15, description: 'Raimundos', price: Math.random()* 100},
      { id:16, description: 'The Offspring', price: Math.random()* 100},
      { id:17, description: 'Florece + The Machine', price: Math.random()* 100},
      { id:18, description: 'The Roots', price: Math.random()* 100},
      { id:19, description: 'Blur', price: Math.random()* 100},
      { id:20, description: 'Fitz and the Trantrums', price: Math.random()* 100},
      { id:21, description: 'Cage the Elephant', price: Math.random()* 100},
      { id:22, description: 'MAGIC!', price: Math.random()* 100},
      { id:23, description: 'Imagine Dragons', price: Math.random()* 100},
      { id:24, description: 'Stereophonics', price: Math.random()* 100},
      { id:25, description: 'Arctic Moneys', price: Math.random()* 100},
      { id:26, description: 'Foster The People', price: Math.random()* 100},
      { id:27, description: 'Queens of the Stone Age', price: Math.random()* 100},
      { id:28, description: 'X Ambassadors', price: Math.random()* 100},
      { id:29, description: 'Needtobreathe', price: Math.random()* 100},
      { id:30, description: 'City and Colour', price: Math.random()* 100}

    ]

    const paymentMethod: PaymentMethod[] = [
      { id: 1, description: 'A Vista' },
      { id: 2, description: 'A prazo 30 Dias' },
      { id: 3, description: '3x - 30, 60 e 90' },
      { id: 4, description: 'Pagamento Antecipado' },
      { id: 5, description: '2x - 0 + 30 dias' },
    ];

    const sales: Sales[] = [
      { id: 1, customerId: 1, paymentMethodId: 1, issueDate: this.randomDate(), status: 'E' },
      { id: 2, customerId: 2, paymentMethodId: 4, issueDate: this.randomDate(), status: 'A' },
      { id: 3, customerId: 2, paymentMethodId: 5, issueDate: this.randomDate(), status: 'E' },
      { id: 4, customerId: 4, paymentMethodId: 3, issueDate: this.randomDate(), status: 'E' },
      { id: 5, customerId: 3, paymentMethodId: 2, issueDate: this.randomDate(), status: 'A' },
      { id: 6, customerId: 1, paymentMethodId: 1, issueDate: this.randomDate(), status: 'E' },
      { id: 7, customerId: 5, paymentMethodId: 3, issueDate: this.randomDate(), status: 'A' },
      { id: 8, customerId: 1, paymentMethodId: 1, issueDate: this.randomDate(), status: 'A' },
      { id: 9, customerId: 9, paymentMethodId: 5, issueDate: this.randomDate(), status: 'A' },
      { id: 10, customerId: 12, paymentMethodId: 2, issueDate: this.randomDate(), status: 'E' },
      { id: 11, customerId: 1, paymentMethodId: 1, issueDate: this.randomDate(), status: 'A' },
      { id: 12, customerId: 1, paymentMethodId: 2, issueDate: this.randomDate(), status: 'A' },
      { id: 13, customerId: 12, paymentMethodId: 3, issueDate: this.randomDate(), status: 'A' },
    ];

    const salesItems: SalesItem[] = [
      { id: 1, salesId: 1, itemId: 1, productId: 1, value: 20.99, quantity: 2, amount: 41.98},
      { id: 2, salesId: 1, itemId: 2, productId: 6, value: 14.98, quantity: 1, amount: 14.98},
      { id: 3, salesId: 2, itemId: 1, productId: 3, value: 29.9, quantity: 5, amount: 145.5},
      { id: 4, salesId: 2, itemId: 2, productId: 4, value: 10.49, quantity: 4, amount: 41.96},
      { id: 5, salesId: 2, itemId: 3, productId: 1, value: 20.99, quantity: 1, amount: 20.99},
      { id: 6, salesId: 2, itemId: 4, productId: 6, value: 14.98, quantity: 7, amount: 104.86},
      { id: 7, salesId: 3, itemId: 1, productId: 4, value: 10.49, quantity: 4, amount: 41.96},
      { id: 8, salesId: 3, itemId: 2, productId: 1, value: 20.99, quantity: 1, amount: 20.99},
      { id: 9, salesId: 3, itemId: 3, productId: 6, value: 14.98, quantity: 6, amount: 89.88},
      { id: 10, salesId: 4, itemId: 1, productId: 30, value: 20.99, quantity: 2, amount: 41.98},
      { id: 11, salesId: 4, itemId: 2, productId: 6, value: 14.98, quantity: 1, amount: 14.98},
      { id: 12, salesId: 4, itemId: 3, productId: 3, value: 29.9, quantity: 5, amount: 145.5},
      { id: 13, salesId: 4, itemId: 4, productId: 21, value: 10.49, quantity: 4, amount: 41.96},
      { id: 14, salesId: 4, itemId: 5, productId: 22, value: 10.49, quantity: 4, amount: 41.96},
      { id: 15, salesId: 4, itemId: 6, productId: 1, value: 20.99, quantity: 1, amount: 20.99},
      { id: 16, salesId: 4, itemId: 7, productId: 24, value: 14.98, quantity: 7, amount: 104.86},
      { id: 17, salesId: 4, itemId: 8, productId: 4, value: 10.49, quantity: 4, amount: 41.96},
      { id: 18, salesId: 4, itemId: 9, productId: 1, value: 20.99, quantity: 1, amount: 20.99},
      { id: 19, salesId: 4, itemId: 10, productId: 26, value: 14.98, quantity: 6, amount: 89.88},
      { id: 20, salesId: 5, itemId: 1, productId: 3, value: 29.9, quantity: 5, amount: 145.5},
      { id: 21, salesId: 5, itemId: 1, productId: 26, value: 145.5, quantity: 1, amount: 145.5},
      { id: 22, salesId: 6, itemId: 1, productId: 13, value: 8.92, quantity: 12, amount: 107.04},
      { id: 23, salesId: 6, itemId: 2, productId: 2, value: 13.46, quantity: 2, amount: 26.92},
      { id: 24, salesId: 7, itemId: 1, productId: 5, value: 19.31, quantity: 2, amount: 38.62},
      { id: 25, salesId: 8, itemId: 1, productId: 27, value: 145.5, quantity: 3, amount: 173.64},
      { id: 26, salesId: 8, itemId: 2, productId: 13, value: 8.92, quantity: 1, amount: 8.92},
      { id: 27, salesId: 8, itemId: 3, productId: 7, value: 99.86, quantity: 4, amount: 399.44},
      { id: 28, salesId: 8, itemId: 4, productId: 21, value: 22.67, quantity: 1, amount: 22.67},
      { id: 29, salesId: 9, itemId: 1, productId: 24, value: 25.36, quantity: 1, amount: 25.36},
      { id: 30, salesId: 9, itemId: 2, productId: 30, value: 15.16, quantity: 13, amount: 197.08},
      { id: 31, salesId: 10, itemId: 1, productId: 26, value: 145.5, quantity: 1, amount: 145.5},
      { id: 32, salesId: 11, itemId: 1, productId: 26, value: 145.5, quantity: 1, amount: 145.5},
      { id: 33, salesId: 12, itemId: 1, productId: 26, value: 145.5, quantity: 1, amount: 145.5},
      { id: 34, salesId: 13, itemId: 1, productId: 22, value: 145.5, quantity: 1, amount: 63.62},
      { id: 35, salesId: 13, itemId: 2, productId: 23, value: 36.93, quantity: 21, amount: 775.53},
    ];

    const db = { customer, paymentMethod, products, sales, salesItems };

    return of(db).pipe(delay(1300));
  }

  randomDate() : Date {
    const start = new Date('2021-01-01');
    const end = new Date();
    const diff =  end.getTime() - start.getTime();
    const new_diff = diff * Math.random();
    const date = new Date(start.getTime() + new_diff);
    return date;
  }
}
