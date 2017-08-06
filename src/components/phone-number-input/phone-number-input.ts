import { Component } from '@angular/core';

/**
 * Generated class for the PhoneNumberInputComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'phone-number-input',
  templateUrl: 'phone-number-input.html'
})
export class PhoneNumberInputComponent {

  text: string;

  constructor() {
    console.log('Hello PhoneNumberInputComponent Component');
    this.text = 'Hello World';
  }

}
