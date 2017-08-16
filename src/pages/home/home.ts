import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LocalUserDataProvider } from '../../providers/local-user-data/local-user-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
