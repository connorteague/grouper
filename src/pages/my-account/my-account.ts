import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AuthFirebaseProvider } from '../../providers/auth-firebase/auth-firebase';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {

  constructor(
    public navCtrl: NavController,
    private _authFirebase: AuthFirebaseProvider,
    private _auth: AuthProvider) {
  }

  ionViewDidLoad() {
    
  }

  logout() {
    this._authFirebase.logout().then( _ => {
      // logout successful, do anything with native storage.
      this._auth.logout();
      this.navCtrl.setRoot('LandingPage');
    }, error => {
      console.log('Error logging out: ' + error.message);
    });
  }

  viewTutorial() {
    this.navCtrl.setRoot('TutorialPage');
  }

}
