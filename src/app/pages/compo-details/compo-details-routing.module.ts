import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompoDetailsPage } from './compo-details.page';

const routes: Routes = [
  {
    path: '',
    component: CompoDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompoDetailsPageRoutingModule {}
