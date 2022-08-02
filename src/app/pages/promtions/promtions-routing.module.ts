import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromtionsPage } from './promtions.page';

const routes: Routes = [
  {
    path: '',
    component: PromtionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromtionsPageRoutingModule {}
