import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';


@Component({
  selector: 'home-tabs',
  templateUrl: 'home-tabs.html'
})
export class HomeTabsComponent {

  tab1Root: any = 'HomePage';
  tab2Root: any = 'MessagesPage';

  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    console.log("_navParams.data.tabIndex: " + navParams.data.tabIndex);
    
    this.mySelectedIndex = navParams.data.tabIndex || 0;
    console.log('mySelectedIndex: ' + this.mySelectedIndex);
  }

}
