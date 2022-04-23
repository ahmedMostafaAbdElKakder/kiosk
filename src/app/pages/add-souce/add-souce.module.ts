import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSoucePageRoutingModule } from './add-souce-routing.module';

import { AddSoucePage } from './add-souce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddSoucePageRoutingModule
  ],
  declarations: [AddSoucePage]
})
export class AddSoucePageModule {}
