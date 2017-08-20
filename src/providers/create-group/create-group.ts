import { Injectable } from '@angular/core';


@Injectable()
export class CreateGroupProvider {

  name: string;
  type: string;
  homeBase;
  groupPicture;
  members;


  constructor() {

  }

}
