import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { SalesListComponent } from './sales-list/sales-list.component';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesFormComponent } from './sales-form/sales-form.component';

@NgModule({
  imports: [
    SharedModule,
    SalesRoutingModule
  ],
  declarations: [
    SalesListComponent,
    SalesFormComponent
  ],
})
export class SalesModule { }
