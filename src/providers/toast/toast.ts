import { Injectable } from '@angular/core';

import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastProvider {

  constructor (private _toastCtrl: ToastController) {
    
  }

  login(){
    let toast = this._toastCtrl.create({
      message: 'Successfully signed in',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  logout(){
    let toast = this._toastCtrl.create({
      message: 'Successfully logged out',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  accountCreated(){
    let toast = this._toastCtrl.create({
      message: 'Account successfully created',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}
