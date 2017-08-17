import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, AlertController } from 'ionic-angular';

import { SignUpProvider } from '../../../providers/sign-up/sign-up';

@IonicPage()
@Component({
  selector: 'page-sign-up-name',
  templateUrl: 'sign-up-name.html',
})
export class SignUpNamePage {

  nameForm: FormGroup;

  canLeavePage: boolean;

  constructor(public navCtrl: NavController,
    private _fb: FormBuilder,
    public alertCtrl: AlertController,
    private signUpProvider: SignUpProvider)
  {
    this.buildNameForm();
    this.navCtrl.isTransitioning
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.canLeavePage = false;
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

  buildNameForm() {
    this.nameForm = this._fb.group({
      firstName: [this.signUpProvider.firstName, [
        Validators.required
      ]],
      lastName: [this.signUpProvider.lastName, [
        Validators.required
      ]]
    })
  }

  onContinue() {
    if(this.nameForm.invalid){
      console.log('Name form is invalid. This should not be able to run.');
    } else {
      this.canLeavePage = true;
      this.signUpProvider.firstName = this.nameForm.value.firstName;
      this.signUpProvider.lastName = this.nameForm.value.lastName;
      this.navCtrl.push('SignUpPasswordPage')
    }
  }

}
