import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(
      m => m.HomeModule
    )
  },
  {
    path: 'sales',
    loadChildren: () => import('./pages/sales/sales.module').then(
      m => m.SalesModule
    )
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
