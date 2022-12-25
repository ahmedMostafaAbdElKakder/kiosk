import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseComboPageRoutingModule } from './choose-combo-routing.module';

import { ChooseComboPage } from './choose-combo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseComboPageRoutingModule
  ],
  declarations: [ChooseComboPage]
})
export class ChooseComboPageModule {}
