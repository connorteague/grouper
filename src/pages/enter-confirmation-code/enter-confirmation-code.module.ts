import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnterConfirmationCodePage } from './enter-confirmation-code';

@NgModule({
  declarations: [
    EnterConfirmationCodePage,
  ],
  imports: [
    IonicPageModule.forChild(EnterConfirmationCodePage),
  ],
})
export class EnterConfirmationCodePageModule {}
