import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import 'rxjs/add/operator/map';


@Injectable()
export class AuthFirebaseProvider {

  constructor(
    private _afAuth: AngularFireAuth,
    private _afDb: AngularFireDatabase) {
    
  }

  getUserId() {

  }

  getUser():firebase.User {
    return this._afAuth.auth.currentUser;
  }

  logout(): firebase.Promise<any> {
    return this._afAuth.auth.signOut()
  }

  signUpWithEmail(email: string, password: string, firstName: string, lastName: string): firebase.Promise<any> {
    return this._afAuth.auth.createUserWithEmailAndPassword(email, password).then( newUser => {
      this._afDb.object('user/' +newUser.uid).set({
        firstName: firstName, lastName: lastName, email: email
      })
    })
  }

  
  loginWithEmail(email: string, password: string):firebase.Promise<any> {
    return this._afAuth.auth.signInWithEmailAndPassword(email, password)
  }

  resetPassword(email: string):firebase.Promise<any> {
    return this._afAuth.auth.sendPasswordResetEmail(email);
  }

}
