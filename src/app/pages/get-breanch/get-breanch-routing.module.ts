import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetBreanchPage } from './get-breanch.page';

const routes: Routes = [
  {
    path: '',
    component: GetBreanchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetBreanchPageRoutingModule {}
