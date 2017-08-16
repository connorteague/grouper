import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { isValidNumber } from 'libphonenumber-js';

import { PhoneInfoProvider } from '../../providers/phone-info/phone-info';


@Injectable()
export class UtilProvider {

  constructor(
    public phoneInfo: PhoneInfoProvider
  )
  {

  }
  // Username represnets either a valid phone number or email.
  isUsername(username: string): boolean {
    if (this.isValidPhoneNumber(username, this.phoneInfo.simCountryCode) || this.isEmail(username) ){
      return true;
    } else {
      return false;
    }
  }

  whatTypeIsThis(input: string): string {
    if( this.isValidPhoneNumber(input, this.phoneInfo.simCountryCode)) {
      return 'phone';
    }
    else if (this.isEmail(input)) {
      return 'email';
    }
  }

  isValidPhoneNumber (phoneNumber: string, countryCode:any) {
    return isValidNumber(phoneNumber, countryCode);
  }

  isEmail (email: string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
