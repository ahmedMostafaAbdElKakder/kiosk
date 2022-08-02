import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromDetailsPageRoutingModule } from './prom-details-routing.module';

import { PromDetailsPage } from './prom-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromDetailsPageRoutingModule
  ],
  declarations: [PromDetailsPage]
})
export class PromDetailsPageModule {}
