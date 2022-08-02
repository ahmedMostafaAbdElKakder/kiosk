import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromDetailsPage } from './prom-details.page';

const routes: Routes = [
  {
    path: '',
    component: PromDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromDetailsPageRoutingModule {}
