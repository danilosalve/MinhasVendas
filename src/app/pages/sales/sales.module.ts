import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { SalesListComponent } from './sales-list/sales-list.component';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesFormComponent } from './sales-form/sales-form.component';
import { ProductsListComponent } from './sales-form/products-list/products-list.component';

@NgModule({
  imports: [
    SharedModule,
    SalesRoutingModule
  ],
  declarations: [
    SalesListComponent,
    SalesFormComponent,
    ProductsListComponent
  ],
})
export class SalesModule { }
