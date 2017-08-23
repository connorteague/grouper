import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupMessagesPage } from './group-messages';

@NgModule({
  declarations: [
    GroupMessagesPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupMessagesPage),
  ],
})
export class GroupMessagesPageModule {}
