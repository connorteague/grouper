import { Component } from '@angular/core';
import { NavParams, IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home-tabs',
  templateUrl: 'home-tabs.html',
})
export class HomeTabsPage {

  tab1Root: any = 'HomePage';
  tab2Root: any = 'MessagesPage';

  mySelectedIndex: number;

  constructor(public navParams: NavParams) {
    console.log("_navParams.data.tabIndex: " + navParams.get('tabIndex'));
    
    this.mySelectedIndex = navParams.data.tabIndex || 0;
    console.log('mySelectedIndex: ' + this.mySelectedIndex);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeTabsPage');
  }

}
