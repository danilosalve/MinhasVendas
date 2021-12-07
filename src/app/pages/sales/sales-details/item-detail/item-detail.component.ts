import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoDynamicViewField } from '@po-ui/ng-components';

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
    protected activatedRoute: ActivatedRoute,
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
    this.items = this.activatedRoute.snapshot.data['salesItem'];
  }
}
