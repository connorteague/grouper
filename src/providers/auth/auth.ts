import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { AuthFirebaseProvider } from './../auth-firebase/auth-firebase';

// import { LocalUserDataProvider } from './../local-user-data/local-user-data';

import { UtilProvider } from '../../providers/util/util';
import { PhoneInfoProvider } from '../../providers/phone-info/phone-info';

interface LoginCallback {
    ( error: Error, result?: number ) : void;
}


@Injectable()
export class AuthProvider {

  constructor(
    // public userData: LocalUserDataProvider,
    public utilProvider: UtilProvider,
    public phoneInfo: PhoneInfoProvider,
    public firebaseAuth: AuthFirebaseProvider)
  {

  }

  login(username: string, /*password: string,*/ countryCode: string, response) {
    // determine if 'username' is an email or phonenumber
    let type = this.utilProvider.whatTypeIsThis(username);
    if(type == 'email') {
      // this.loginWithEmail(username, password);
    } else if(type == 'phone') {
      this.loginWithPhone(username, /*password,*/ countryCode, response);
    }
  }

  loginWithEmail(username, password): Promise<any> {
    // let me = this;
    const emailPromise = new Promise((resolve, reject) => {
      this.firebaseAuth.loginWithEmail(username, password).then( user => {
        resolve(user);
      }, error => {
        reject(error)
      })
      reject(new Error("Something awful happened"));
    })
    return emailPromise;



    // this.firebaseAuth.loginWithEmail(username, password)
  }



  loginWithPhone(username, /*password,*/ countryCode: string, response) {
    let phoneNumber = countryCode + username;
    this.firebaseAuth.loginWithPhone(phoneNumber, response);
  }
    /* OK */
  fn(x: () => void) {
      x();
  }

}
