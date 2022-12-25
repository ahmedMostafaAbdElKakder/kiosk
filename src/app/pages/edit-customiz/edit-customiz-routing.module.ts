import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCustomizPage } from './edit-customiz.page';

const routes: Routes = [
  {
    path: '',
    component: EditCustomizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCustomizPageRoutingModule {}
