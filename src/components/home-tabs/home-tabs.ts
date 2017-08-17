import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';
import { MessagesComponent } from '../../components/messages/messages';


@Component({
  selector: 'home-tabs',
  templateUrl: 'home-tabs.html'
})
export class HomeTabsComponent {

  tab1Root: any = HomePage;
  tab2Root: any = MessagesComponent;

  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
