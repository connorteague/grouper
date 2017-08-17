import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { ToastProvider } from '../toast/toast';

import 'rxjs/add/operator/map';


@Injectable()
export class AuthFirebaseProvider {

  constructor(private _afAuth: AngularFireAuth) {
    
  }

  logout() {
    this._afAuth.auth.signOut();
  }

}
