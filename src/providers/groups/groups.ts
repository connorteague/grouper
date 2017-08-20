import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { ToastProvider } from '../toast/toast';


@Injectable()
export class GroupsProvider {

  constructor(
    private _afAuth: AngularFireAuth,
    private _afDb: AngularFireDatabase,
    private _toastProvider: ToastProvider
  ) {
    
  }

  createGroup(name: string, type: string): firebase.Promise<any> {
    // get the group push ID
    let groupRef = firebase.database().ref('groups').push();
    
    // set group info
    groupRef.set({
      name: name,
      type: type
    }).then( newGroup => {
      this._toastProvider.groupCreated();
    })
    return;
  }
  // once I learn more about picture formats and such, I should take a look at this again.
  setGroupPicture(picture: any): firebase.Promise<any> {
    //  TODO: learn more stuff.
    return;
  }

  /*
   * @input a list of group members to add.
   */
  addGroupMembers(groupMembers: any): firebase.Promise<any> {
    // add group members.
    return;
  }

  setGroupHomeBase(): firebase.Promise<any> {
    // set the group home base.
    return;
  }

}