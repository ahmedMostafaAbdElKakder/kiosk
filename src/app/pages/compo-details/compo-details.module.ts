import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompoDetailsPageRoutingModule } from './compo-details-routing.module';

import { CompoDetailsPage } from './compo-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompoDetailsPageRoutingModule
  ],
  declarations: [CompoDetailsPage]
})
export class CompoDetailsPageModule {}
