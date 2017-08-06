import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignUpPage } from './sign-up';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    SignUpPage,
  ],
  imports: [
    IonicPageModule.forChild(SignUpPage),
    PipesModule.forRoot()
  ],
})
export class SignUpPageModule {}
