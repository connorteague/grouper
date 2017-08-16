import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController } from 'ionic-angular';

import { LocalUserDataProvider } from '../../providers/local-user-data/local-user-data';



@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

    username: string;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public userData: LocalUserDataProvider)
  {
  }

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {

  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Change Username',
        buttons: [
          'Cancel'
        ]
      });
      alert.addInput({
        name: 'username',
        value: this.username,
        placeholder: 'username'
      });
      alert.addButton({
        text: 'Ok',
        handler: (data: any) => {
          this.userData.setUsername(data.username);
          this.getUsername();
        }
      });

      alert.present();
    }

    getUsername() {
      this.userData.getUsername().then((username) => {
        this.username = username;
      })
    }

    changePassword() {

    }

    logout() {
      this.userData.logout();
      this.navCtrl.setRoot('LandingPage');

    }

    support() {
      this.navCtrl.push('SupportPage');
    }


}
