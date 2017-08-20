import { Component } from '@angular/core';

import { ViewController, App, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'search-messages',
  templateUrl: 'search-messages.html'
})
export class SearchMessagesComponent {

  searchResults;

  constructor(
    public viewCtrl: ViewController,
    public appCtrl: App
  ) {
  }

  // Use 
  // this.appCtrl.getRootNav();
  // to get a reference to the current NavController.

  

  search($event) {
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
