import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddModfiresPageRoutingModule } from './add-modfires-routing.module';

import { AddModfiresPage } from './add-modfires.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddModfiresPageRoutingModule
  ],
  declarations: [AddModfiresPage]
})
export class AddModfiresPageModule {}
