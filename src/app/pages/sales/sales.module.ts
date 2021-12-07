import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { SalesListComponent } from './sales-list/sales-list.component';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesFormComponent } from './sales-form/sales-form.component';
import { ProductsListComponent } from './sales-form/products-list/products-list.component';
import { GeneralDataComponent } from './sales-form/general-data/general-data.component';
import { SalesDetailsComponent } from './sales-details/sales-details.component';
import { ItemDetailComponent } from './sales-details/item-detail/item-detail.component';

@NgModule({
  imports: [
    SharedModule,
    SalesRoutingModule
  ],
  declarations: [
    SalesListComponent,
    SalesFormComponent,
    ProductsListComponent,
    GeneralDataComponent,
    SalesDetailsComponent,
    ItemDetailComponent
  ],
})
export class SalesModule { }
