import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { IonicPage, NavController, NavParams, Loading, LoadingController,
  AlertController} from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { ToastProvider } from './../toast/toast';

@Injectable()
export class AuthFirebaseProvider {

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public afAuth: AngularFireAuth,
    private _afDb: AngularFireDatabase,
    public toastProvider: ToastProvider
  )
  {
  }


  loginWithEmail(email: string, password: string ): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then( () => {
      return;
    }, error => {
      return error;
    })
  }

  loginWithPhone(phone: string, response /*password: string*/) {
    let me = this;

    // reCAPTCHA solved, allow signInWithPhoneNumber.
    me.afAuth.auth.signInWithPhoneNumber(phone, response).then( (confirmationResult) => {
      let prompt = this.alertCtrl.create({
        title: 'Enter the Confirmation code',
        inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
        buttons: [
          { text: 'Cancel',
            handler: data => { console.log('Cancel clicked'); }
          },
          { text: 'Submit',
            handler: data => {
              let credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, data)
              me.afAuth.auth.signInWithCredential(credential).then( () => {
                me.toastProvider.loginToast();
              })

              confirmationResult.confirm(data.confirmationCode)
              .then(function (result) {
                // User signed in successfully.
                console.log(result.user);
                // ...
              }).catch(function (error) {
                // User couldn't sign in (bad verification code?)
                // ...
              });
            }
          }
        ]
      });
      prompt.present();
    })

  }

  signUpWithEmail(email: string, password: string, firstName: string, lastName: string) {

  }

  signUpWithPhone(phone: string, /*password: string*/ firstName: string, lastName: string) {

  }

  resetPassword() {

  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
