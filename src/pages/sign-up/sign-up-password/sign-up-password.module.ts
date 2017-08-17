import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignUpPasswordPage } from './sign-up-password';

@NgModule({
  declarations: [
    SignUpPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(SignUpPasswordPage),
  ],
})
export class SignUpPasswordPageModule {}
