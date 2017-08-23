import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-group-tabs',
  templateUrl: 'group-tabs.html',
})
export class GroupTabsPage {

  tab1Root: any = 'GroupHomePage';
  tab2Root: any = 'GroupMessagesPage';

  mySelectedIndex: number;

  constructor( public navParams: NavParams) {
    // mySelectedIndex is equal to the passed nav param 'tabIndex' OR 0;
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

  ionViewDidLoad() {
  }

}
