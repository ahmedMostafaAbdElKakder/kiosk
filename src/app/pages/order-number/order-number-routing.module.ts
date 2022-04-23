import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderNumberPage } from './order-number.page';

const routes: Routes = [
  {
    path: '',
    component: OrderNumberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderNumberPageRoutingModule {}
