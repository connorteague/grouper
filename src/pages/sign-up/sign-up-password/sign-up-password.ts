import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, Events, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { SignUpProvider } from '../../../providers/sign-up/sign-up';
import { AuthFirebaseProvider } from '../../../providers/auth-firebase/auth-firebase';
import { ToastProvider } from '../../../providers/toast/toast';


@IonicPage()
@Component({
  selector: 'page-sign-up-password',
  templateUrl: 'sign-up-password.html',
})
export class SignUpPasswordPage {

  passwordForm: FormGroup;

  canLeavePage: boolean;

  public loading: Loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private _fb: FormBuilder,
    private signUpProvider: SignUpProvider,
    private _authFirebase: AuthFirebaseProvider,
    private _toastProvider: ToastProvider,
    public storage: Storage,
    public events: Events) 
  {
    // constructor stuff.
    this.buildPasswordFrom();
  }

  ionViewDidLoad() {
  }

  ionViewCanLeave(): Promise<any> {
    return new Promise((resolve, reject) => {
      if(this.canLeavePage) {
        resolve();
      } else {
        let confirm = this.alertCtrl.create({
          title: 'Are you sure?',
          message: 'Bunnies will die :(',
          buttons: [{
            text: 'OK', 
            handler: () => {
              resolve();
            },
          }, {
            text: 'Cancel',
            handler: () => {
              reject();
            }
          }],
        });
        confirm.present();
      }
    })
  }

  buildPasswordFrom() {
    this.passwordForm = this._fb.group({
      password: ['', [
        Validators.required
      ]],
      verifyPassword: ['', [
        Validators.required
      ]]
    })
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      console.log('Name form is invalid. This should not be able to run.');
    } else {
      if (this.signUpProvider.signUpMethod = 'email') {
        this.signUpWithEmail();
      } else if (this.signUpProvider.signUpMethod = 'phone') {
        this.signUpWithPhone();
      }
    }
  }

  signUpWithEmail() {
    this._authFirebase.signUpWithEmail(this.signUpProvider.email, this.passwordForm.value.password,
      this.signUpProvider.firstName, this.signUpProvider.lastName).then( newUser => {
        // account successfully created
        this.loading.dismiss().then( _ => {
          // do any native storage things.
          this.storage.set('accountSignInMethod', 'email');
          // allow navigation
          this.canLeavePage = true;
          this._toastProvider.accountCreated();
          // navigate to the tutorial page.
          this.navCtrl.push('TutorialPage');
        })
        
      }, error => {
        this.loading.dismiss().then(_ => {
          let alert = this.alertCtrl.create({
            title: error.name,
            subTitle: error.message,
            buttons: ['Dismiss']
          });
          alert.present();
        });
      });
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  signUpWithPhone() {

  }

}
