import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCustomizPageRoutingModule } from './edit-customiz-routing.module';

import { EditCustomizPage } from './edit-customiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCustomizPageRoutingModule
  ],
  declarations: [EditCustomizPage]
})
export class EditCustomizPageModule {}
