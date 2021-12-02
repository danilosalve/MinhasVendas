import { Observable, of } from 'rxjs';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

import { Customer } from './shared/interfaces/customer';
import { PaymentMethod } from './shared/interfaces/paymentMethod';
import { Sales } from './pages/sales/shared/sales';
import { delay } from 'rxjs/operators';

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

    const paymentMethod: PaymentMethod[] = [
      { id: 1, description: 'A Vista' },
      { id: 2, description: 'A prazo 30 Dias' },
      { id: 3, description: '3x - 30, 60 e 90' },
      { id: 4, description: 'Pagamento Antecipado' },
      { id: 5, description: '2x - 0 + 30 dias' },
    ];

    const sales: Sales[] = [
      { id: 1, customerId: 1, paymentMethodId: 1, issueDate: this.randomDate() },
      { id: 2, customerId: 2, paymentMethodId: 4, issueDate: this.randomDate() },
      { id: 3, customerId: 2, paymentMethodId: 5, issueDate: this.randomDate() },
      { id: 4, customerId: 4, paymentMethodId: 3, issueDate: this.randomDate() },
      { id: 5, customerId: 3, paymentMethodId: 2, issueDate: this.randomDate() },
      { id: 6, customerId: 1, paymentMethodId: 1, issueDate: this.randomDate() },
      { id: 7, customerId: 5, paymentMethodId: 3, issueDate: this.randomDate() },
      { id: 8, customerId: 1, paymentMethodId: 1, issueDate: this.randomDate() },
      { id: 9, customerId: 9, paymentMethodId: 5, issueDate: this.randomDate() },
      { id: 10, customerId: 1, paymentMethodId: 1, issueDate: this.randomDate() },
      { id: 11, customerId: 1, paymentMethodId: 2, issueDate: this.randomDate() },
    ];
    const db = { customer, paymentMethod, sales };

    return of(db).pipe(delay(3000));
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
