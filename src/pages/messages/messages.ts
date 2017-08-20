import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

// import { SearchMessagesComponent } from '../../components/search-messages/search-messages';

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  constructor(
    public modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    
  }

  openSearchModal() {
    let modal = this.modalCtrl.create('SearchMessagesComponent');

    // It's here, inbetween defining and presenting the modal that we can subscribe
    // to any data that is passed back from the modal when dismissed.

    modal.present();
  }

}
