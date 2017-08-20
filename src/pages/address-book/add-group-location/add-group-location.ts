import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-add-group-location',
  templateUrl: 'add-group-location.html',
})
export class AddGroupLocationPage {

  title;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {
    if (this.navParams.get('title')) {
      this.title = this.navParams.get('title');
    } else {
      this.title = "Add location"
    }
  }

  ionViewDidLoad() {
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

}
