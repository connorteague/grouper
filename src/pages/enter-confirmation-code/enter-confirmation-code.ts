import { Component, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams, Loading, LoadingController,
  AlertController} from 'ionic-angular';

import { LocalUserDataProvider } from '../../providers/local-user-data/local-user-data';

import { UtilProvider } from '../../providers/util/util';
import { PhoneInfoProvider } from '../../providers/phone-info/phone-info';
import { AuthProvider } from '../../providers/auth/auth';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-enter-confirmation-code',
  templateUrl: 'enter-confirmation-code.html',
})
export class EnterConfirmationCodePage {

  confirmationForm: FormGroup;
  confirmResult;
  phoneNumber;

  confirmationCode: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _fb: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public userData: LocalUserDataProvider,
    public utilProvider: UtilProvider,
    public phoneInfo: PhoneInfoProvider,
    public authProvider: AuthProvider,
    public renderer2: Renderer2)
  {
      this.phoneNumber = this.navParams.get('phone');
      this.confirmResult = navParams.get('result');
      this.buildConfirmationForm();
  }

  buildConfirmationForm() {
    this.confirmationForm = this._fb.group({
      code: [this.confirmationCode, [
        Validators.minLength(6)
      ]]
    })
  }

  onSubmit() {
    if(!this.confirmationForm.valid) {

    } else {
      this.confirmResult.confirm(this.confirmationForm.value.code).then( (result) => {
        // user sign in successfully
        var user = result.user;
      }).catch( (error) => {
        // user couldn't sign in
        console.log('User could not sign in.');
      })
    }
  }





}
