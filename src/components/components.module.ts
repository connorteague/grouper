import { NgModule } from '@angular/core';
import { HomeTabsComponent } from './home-tabs/home-tabs';
import { MessagesComponent } from './messages/messages';
@NgModule({
	declarations: [HomeTabsComponent,
    MessagesComponent],
	imports: [],
	exports: [HomeTabsComponent,
    MessagesComponent]
})
export class ComponentsModule {}
