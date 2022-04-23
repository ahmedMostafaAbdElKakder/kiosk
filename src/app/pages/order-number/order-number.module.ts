import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderNumberPageRoutingModule } from './order-number-routing.module';

import { OrderNumberPage } from './order-number.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderNumberPageRoutingModule
  ],
  declarations: [OrderNumberPage]
})
export class OrderNumberPageModule {}
