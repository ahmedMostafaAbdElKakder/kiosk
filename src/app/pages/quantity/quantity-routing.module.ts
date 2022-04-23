import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuantityPage } from './quantity.page';

const routes: Routes = [
  {
    path: '',
    component: QuantityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuantityPageRoutingModule {}
