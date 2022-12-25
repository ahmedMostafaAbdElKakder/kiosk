import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompoPageRoutingModule } from './compo-routing.module';

import { CompoPage } from './compo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompoPageRoutingModule
  ],
  declarations: [CompoPage]
})
export class CompoPageModule {}
