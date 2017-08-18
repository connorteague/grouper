import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

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
    this.modalCtrl.create('SearchMessagesComponent').present();
  }

}
