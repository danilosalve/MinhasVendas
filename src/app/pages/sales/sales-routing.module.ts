import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SalesDetailsComponent } from './sales-details/sales-details.component';
import { SalesFormComponent } from './sales-form/sales-form.component';
import { SalesListComponent } from './sales-list/sales-list.component';

const routes: Routes = [
  { path: '', component: SalesListComponent},
  { path: 'new', component: SalesFormComponent},
  { path: 'view/:salesId', component: SalesDetailsComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRoutingModule {}
