import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuantityPageRoutingModule } from './quantity-routing.module';

import { QuantityPage } from './quantity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuantityPageRoutingModule
  ],
  declarations: [QuantityPage]
})
export class QuantityPageModule {}
