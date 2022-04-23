import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorisPageRoutingModule } from './categoris-routing.module';

import { CategorisPage } from './categoris.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategorisPageRoutingModule
  ],
  declarations: [CategorisPage]
})
export class CategorisPageModule {}
