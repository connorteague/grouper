import { Component, ViewChild } from '@angular/core';

import { IonicPage, Nav, NavController, NavParams, Events } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  // @ViewChild(Nav) nav: Nav;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events) {
  }

  ionViewDidLoad() {
  }

  createGroup() {
    // navigate to the Create Group page.
    // this.nav.setRoot('CreateGroupPage').then( _ => {
    this.navCtrl.setRoot('CreateGroupPage').then( _ => {
      // disable the nav menu.
      this.events.publish('homeMenu:disable');
    })
 
  }

}
