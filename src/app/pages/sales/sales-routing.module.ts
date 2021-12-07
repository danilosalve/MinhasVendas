import { SalesDetailsGuard } from './shared/guards/sales-details.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SalesDetailsComponent } from './sales-details/sales-details.component';
import { SalesFormComponent } from './sales-form/sales-form.component';
import { SalesItemsDetailsGuard } from './shared/guards/sales-items-details.guard';
import { SalesListComponent } from './sales-list/sales-list.component';

const routes: Routes = [
  { path: '', component: SalesListComponent },
  { path: 'new', component: SalesFormComponent },
  {
    path: 'view/:salesId',
    component: SalesDetailsComponent,
    resolve: {
      salesItem: SalesItemsDetailsGuard,
      sale: SalesDetailsGuard,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SalesDetailsGuard, SalesItemsDetailsGuard],
})
export class SalesRoutingModule {}
