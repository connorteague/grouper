import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';

import { AuthFirebaseProvider } from '../auth-firebase/auth-firebase';
import { ToastProvider } from '../toast/toast';


@Injectable()
export class AuthProvider {

  constructor (
    private _authFirebase: AuthFirebaseProvider,
    private _toastCtrl: ToastProvider,
    public events: Events) {
    
  }

  logout() {
    this._authFirebase.logout();
    this._toastCtrl.logout();
    // TODO: do anything with the local storage because of logging out.

    this.events.publish('user:logout');
  }

  login() {
    this.events.publish('user:login');
  } 

  signup() {
    this.events.publish('user:signup');
  }

}
