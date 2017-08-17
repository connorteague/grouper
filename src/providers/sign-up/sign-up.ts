import { Injectable } from '@angular/core';


@Injectable()
export class SignUpProvider {

  signUpMethod: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  password: string;

  constructor() {
    // sets the default sign up method.
    this.signUpMethod = 'email';
  }

}
