import { Injectable } from '@angular/core';

import { AuthFirebaseProvider } from '../auth-firebase/auth-firebase';
import { ToastProvider } from '../toast/toast';


@Injectable()
export class AuthProvider {

  constructor (private _authFirebase: AuthFirebaseProvider,
    private _toastCtrl: ToastProvider) {
    
  }

  logout() {
    this._authFirebase.logout();
    this._toastCtrl.logout();
    // TODO: do anything with the local storage because of logging out.
  }

}
