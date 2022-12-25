import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoseBranchPageRoutingModule } from './chose-branch-routing.module';

import { ChoseBranchPage } from './chose-branch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoseBranchPageRoutingModule
  ],
  declarations: [ChoseBranchPage]
})
export class ChoseBranchPageModule {}
