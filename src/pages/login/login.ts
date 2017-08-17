import { HomePage } from '../home/home';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';

import { SimInfoProvider } from '../../providers/sim-info/sim-info';
import { ToastProvider } from '../../providers/toast/toast';

import { Storage } from '@ionic/storage';

import { AuthFirebaseProvider } from '../../providers/auth-firebase/auth-firebase';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginEmailForm: FormGroup;
  loginPhoneForm: FormGroup;

  simAvailable: boolean;

  public loading: Loading;

  // check native storage for the method used to sign up.
  loginMethod;
  // check native storage for a previously used email to login.
  previousEmail: string;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private _fb: FormBuilder,
    private _simInfoProvider: SimInfoProvider,
    public storage: Storage,
    private _authFirebase: AuthFirebaseProvider,
    private _toastProvider: ToastProvider
  ) {
    this.buildPhoneForm();
    this.buildEmailForm();
  }

  ionViewDidLoad() {
    // check for previous sign in method.
    this.storage.get('accountSignInMethod').then( value => {
      if(value === null) {
        // default login method.
        this.loginMethod = 'email';
      } else {
        this.loginMethod = value;
      }
      console.log('accountSignInMethod: ' + value);
    }, error => {
      // default login method.
      this.loginMethod = 'email';
    });
    // check for previously used sign in email.
    this.storage.get('previousEmail').then( value => {
      if (value === null) {
        return;
      } else {
        this.previousEmail = value;
      }
    }, error => {
      console.log('no previous email.');
    })

    if(this._simInfoProvider.simInfo){
      this.simAvailable = true;
    } else {
      this.simAvailable = false;
    }
  }

  buildEmailForm() {
    this.loginEmailForm = this._fb.group({
      email: [this.previousEmail, [
        Validators.required,
        Validators.email
      ]], 
      password: ['', Validators.required]
    })
  }

  buildPhoneForm() {
    this.loginPhoneForm = this._fb.group({
      phone: ['', Validators.required],
      countryCode: ['1']
    })
  }

  onEmailLogin() {
    if (this.loginEmailForm.invalid) {

    } else {
      this._authFirebase.loginWithEmail(this.loginEmailForm.value.email, this.loginEmailForm.value.password)
      .then( value => {
        // we've successfully logged in.
        this.loading.dismiss().then( _ => {
        // do any native storage things.
        this.storage.set('accountSignInMethod', 'email');
        this.storage.set('previousEmail', this.loginEmailForm.value.email);
        // navigate to the home page.
        this._toastProvider.login();
        this.navCtrl.setRoot(HomePage);
        })
      }, error => {
        this.loading.dismiss(_ => {
          let alert = this.alertCtrl.create({
            title: error.name,
            subTitle: error.message,
            buttons: ['Dismiss']
          });
          alert.present();
        })
      })
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }

  }

  onPhoneLogin() {

  }

}
