import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromtionsPageRoutingModule } from './promtions-routing.module';

import { PromtionsPage } from './promtions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromtionsPageRoutingModule
  ],
  declarations: [PromtionsPage]
})
export class PromtionsPageModule {}
