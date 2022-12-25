import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseComboPage } from './choose-combo.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseComboPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseComboPageRoutingModule {}
