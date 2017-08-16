import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams, Loading, LoadingController,
  AlertController} from 'ionic-angular';

import { LocalUserDataProvider } from '../../providers/local-user-data/local-user-data';

import { UtilProvider } from '../../providers/util/util';
import { PhoneInfoProvider } from '../../providers/phone-info/phone-info';
import { AuthProvider } from '../../providers/auth/auth';

// import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
// import firebase from 'firebase/app';

// import { NativeFirebasePhoneAuth } from '@ionic-native/native-firebase-phone-auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  countryCode;

  loginMethod: string;
  // determined by whether or not cordova sim is available.
  showCountryCode: boolean;

  public loading: Loading;

  phoneForm: FormGroup;
  emailForm: FormGroup;

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
    // public firebasePhoneAuth: NativeFirebasePhoneAuth
  )
  {
    this.buildPhoneForm();
    this.buildEmailForm();

    this.showCountryCode = phoneInfo.accessToSim;
    if (this.showCountryCode) {
      this.countryCode = this.phoneInfo.simCountryCode;
    }


  }

  ngAfterViewInit(){
    this.loginMethod = 'phone';
  }

  // Phone form
  buildPhoneForm() {
    this.phoneForm = this._fb.group({
      phoneNumber: [''],
      countryCode:[this.countryCode]
    });

    this.phoneForm.valueChanges.subscribe( data => {
      this.watchPhoneForm(data);
    })
  }

  watchPhoneForm(data?: any) {

  }

  // email form.
  buildEmailForm() {
    this.emailForm = this._fb.group({
      email: ['', [
        Validators.minLength(1)
      ]],
      password: ['', [
        Validators.minLength(1)
      ]]
    });

    this.emailForm.valueChanges.subscribe( data => {
      this.watchLoginForm(data);
    })
  }

  watchLoginForm(data?: any) {
    // const loginForm = this.emailForm;
  }




  onPhoneLogin() {
    if (this.phoneForm.valid){
      // this.firebasePhoneAuth.verifyPhoneNumber(this.phoneForm.value.countryCode + this.phoneForm.value.phoneNumber);
    }


  }

  onEmailLogin() {
    if(!this.emailForm.valid){
      console.log('Email form is invalid.');
    } else {
      this.authProvider.loginWithEmail(this.emailForm.value.email,
        this.emailForm.value.password).then( (user) => {
          this.loading.dismiss().then( (user) => {
            this.navCtrl.setRoot('');
            console.log('Logged in, user uid is: ' + user.uid);
          });
        }, error => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: 'Ok',
                role: 'cancel'
              }
            ]
          });
          alert.present();
        }
      )
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

}
