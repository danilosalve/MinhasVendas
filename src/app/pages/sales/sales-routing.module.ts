import { SalesFormComponent } from './sales-form/sales-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SalesListComponent } from './sales-list/sales-list.component';

const routes: Routes = [
  { path: '', component: SalesListComponent},
  { path: 'new', component: SalesFormComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRoutingModule {}
