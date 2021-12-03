import { SalesService } from './../shared/sales.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoDynamicFormField } from '@po-ui/ng-components';

import { Sales } from '../shared/sales';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.css']
})
export class SalesFormComponent implements OnInit {
  fields: Array<PoDynamicFormField> = [];
  sales: Sales = {
    customerId: 0,
    paymentMethodId: 0,
    issueDate: new Date(),
    status: 'A'
  };
  products$ = new Subscription();

  constructor(
    protected salesService: SalesService,
    protected router: Router,
    ) { }

  ngOnInit(): void {
    this.getFields()
  }

  back(): void {
    this.router.navigate(['sales']);
  }

  getFields(): void {
    this.fields = this.salesService.getFields();
  } 
  
}
