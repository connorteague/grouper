import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickCountryPage } from './pick-country';

@NgModule({
  declarations: [
    PickCountryPage,
  ],
  imports: [
    IonicPageModule.forChild(PickCountryPage),
  ],
})
export class PickCountryPageModule {}
