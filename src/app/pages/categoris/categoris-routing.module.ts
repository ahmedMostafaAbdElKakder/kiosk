import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategorisPage } from './categoris.page';

const routes: Routes = [
  {
    path: '',
    component: CategorisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategorisPageRoutingModule {}
