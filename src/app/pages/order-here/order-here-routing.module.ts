import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderHerePage } from './order-here.page';

const routes: Routes = [
  {
    path: '',
    component: OrderHerePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderHerePageRoutingModule {}
