import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';

import { SimInfoProvider } from '../../providers/sim-info/sim-info';

import { SignUpProvider } from '../../providers/sign-up/sign-up';


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  signUpPhoneForm: FormGroup;
  signUpEmailForm: FormGroup;

  simAvailable: boolean;

  public loading;

  simInfo;

  signUpMethod: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private _fb: FormBuilder,
    private _simInfoProvider: SimInfoProvider,
    private signUpProvider: SignUpProvider
  )
    {
    this.signUpMethod = this.signUpProvider.signUpMethod;
    this.buildSignUpPhoneForm();
    this.buildEmailForm();
  }

  ionViewDidLoad() {
    if(this._simInfoProvider.simInfo){
      this.simAvailable = true;
    } else {
      this.simAvailable = false;
    }
  }

  onPhoneContinue() {

  }

  onEmailContinue() {
    if(this.signUpEmailForm.invalid) {
      console.log('Email seems to be invalid.');
      // TODO: check the email blacklist, only one account can exist per email.
    } else {
      this.signUpProvider.signUpMethod = 'email';
      this.signUpProvider.email = this.signUpEmailForm.value.email;
      this.navCtrl.push('SignUpNamePage');
    }
  }

  buildSignUpPhoneForm() {
    this.signUpPhoneForm = this._fb.group({
      phone: [this.signUpProvider.phoneNumber, Validators.required],
      countryCode: ['1']
    })
  }

  buildEmailForm() {
    this.signUpEmailForm = this._fb.group({
      email: [this.signUpProvider.email, [
        Validators.required,
        Validators.email
      ]]
    })
  }



  // pickCountryCode(){
  //   let alert = this.alertCtrl.create();
  //   alert.setTitle('Country code');

  //   for ( let item in countryNames ) {
  //     alert.addInput({
  //       type: 'radio',
  //       label: item + ' ' + "(" + countryNames[item].phoneCode + ")",
  //       value: countryNames[item].countryCode
  //     })
  //   }
  //   alert.addButton('Cancel'),
  //   alert.addButton({
  //     text: 'OK',
  //     handler: data => {
  //       this.countryCodeValue = data;
  //       this.phoneCodeValue = countryCodes[data].phoneCode;
  //     }
  //   })

  //   alert.present();
  // }


}
