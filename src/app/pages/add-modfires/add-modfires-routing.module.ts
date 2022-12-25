import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddModfiresPage } from './add-modfires.page';

const routes: Routes = [
  {
    path: '',
    component: AddModfiresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddModfiresPageRoutingModule {}
