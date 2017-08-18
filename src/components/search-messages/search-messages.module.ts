import { NgModule } from '@angular/core';

import { IonicModule } from 'ionic-angular';

import { SearchMessagesComponent } from './search-messages';

@NgModule({
  declarations: [
    SearchMessagesComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    SearchMessagesComponent
  ]
})
export class SearchMessagesModule {}
