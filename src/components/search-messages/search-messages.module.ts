import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { SearchMessagesComponent } from './search-messages';

@NgModule({
  declarations: [
    SearchMessagesComponent
  ],
  imports: [
    IonicPageModule.forChild(SearchMessagesComponent)
  ],
  exports: [
    SearchMessagesComponent
  ]
})
export class SearchMessagesModule {}
