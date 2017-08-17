import { Component } from '@angular/core';

/**
 * Generated class for the MessagesComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'messages',
  templateUrl: 'messages.html'
})
export class MessagesComponent {

  text: string;

  constructor() {
    console.log('Hello MessagesComponent Component');
    this.text = 'Hello World';
  }

}
