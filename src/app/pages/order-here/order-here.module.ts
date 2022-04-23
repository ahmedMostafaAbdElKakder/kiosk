import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderHerePageRoutingModule } from './order-here-routing.module';

import { OrderHerePage } from './order-here.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderHerePageRoutingModule
  ],
  declarations: [OrderHerePage]
})
export class OrderHerePageModule {}
