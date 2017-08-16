import { Injectable } from '@angular/core';

import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastProvider {

  constructor(
    public toastCtrl: ToastController)
    {

  }

  loginToast() {
  let toast = this.toastCtrl.create({
    message: 'User was added successfully',
    duration: 3000
  });
  toast.present();
  }

}
