import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSoucePage } from './add-souce.page';

const routes: Routes = [
  {
    path: '',
    component: AddSoucePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSoucePageRoutingModule {}
