import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

@Component({
  selector: 'search-messages',
  templateUrl: 'search-messages.html'
})
export class SearchMessagesComponent {

  text: string;

  constructor(
    public viewCtrl: ViewController
  ) {
  }

  search($event) {
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
