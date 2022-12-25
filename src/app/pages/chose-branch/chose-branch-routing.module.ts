import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChoseBranchPage } from './chose-branch.page';

const routes: Routes = [
  {
    path: '',
    component: ChoseBranchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoseBranchPageRoutingModule {}
