import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetBreanchPageRoutingModule } from './get-breanch-routing.module';

import { GetBreanchPage } from './get-breanch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetBreanchPageRoutingModule
  ],
  declarations: [GetBreanchPage]
})
export class GetBreanchPageModule {}
