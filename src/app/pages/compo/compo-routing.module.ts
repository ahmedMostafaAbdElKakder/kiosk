import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompoPage } from './compo.page';

const routes: Routes = [
  {
    path: '',
    component: CompoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompoPageRoutingModule {}
