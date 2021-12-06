import { Observable, of } from 'rxjs';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

import { Customer } from './shared/interfaces/customer';
import { PaymentMethod } from './shared/interfaces/paymentMethod';
import { Sales } from './pages/sales/shared/interfaces/sales';
import { delay } from 'rxjs/operators';
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
      { id:1, description: 'Pearl Jam', price: Math.random()},
      { id:2, description: 'Alabama Shakes', price: Math.random()},
      { id:3, description: 'The Black Keys', price: Math.random()},
      { id:4, description: 'Queen', price: Math.random()},
      { id:5, description: 'Five Finger Death Punch', price: Math.random()},
      { id:6, description: 'System of a Down', price: Math.random()},
      { id:7, description: 'Eagles of Death Metal', price: Math.random()},
      { id:8, description: 'Weezer', price: Math.random()},
      { id:9, description: 'Eddie Vedder', price: Math.random()},
      { id:10, description: 'Oasis', price: Math.random()},
      { id:11, description: 'Foo Fighters', price: Math.random()},
      { id:12, description: 'Irá!', price: Math.random()},
      { id:13, description: 'Capital Inicial', price: Math.random()},
      { id:14, description: 'Titãs', price: Math.random()},
      { id:15, description: 'Raimundos', price: Math.random()},
      { id:16, description: 'The Offspring', price: Math.random()},
      { id:17, description: 'Florece + The Machine', price: Math.random()},
      { id:18, description: 'The Roots', price: Math.random()},
      { id:19, description: 'Blur', price: Math.random()},
      { id:20, description: 'Fitz and the Trantrums', price: Math.random()},
      { id:21, description: 'Cage the Elephant', price: Math.random()},
      { id:22, description: 'MAGIC!', price: Math.random()},
      { id:23, description: 'Imagine Dragons', price: Math.random()},
      { id:24, description: 'Stereophonics', price: Math.random()},
      { id:25, description: 'Arctic Moneys', price: Math.random()},
      { id:26, description: 'Foster The People', price: Math.random()},
      { id:27, description: 'Queens of the Stone Age', price: Math.random()},
      { id:28, description: 'X Ambassadors', price: Math.random()},
      { id:29, description: 'Needtobreathe', price: Math.random()},
      { id:30, description: 'City and Colour', price: Math.random()}

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
    const db = { customer, paymentMethod, sales, products };

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
