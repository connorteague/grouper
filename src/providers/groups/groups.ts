import { Injectable, PACKAGE_ROOT_URL } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ToastProvider } from '../toast/toast';


@Injectable()
export class GroupsProvider {

  currentGroup: FirebaseObjectObservable<any>;

  constructor(
    private _afAuth: AngularFireAuth,
    private _afDb: AngularFireDatabase,
    private _toastProvider: ToastProvider,
    public events: Events
  ) {
    this.listenToEvents();
    
  }

  listenToEvents() {
    this.events.subscribe('group:selected', (groupId) => {
      this.currentGroup = this._afDb.object(`groups/${groupId}`);
    });
 
  }

  createGroup(name: string, type: string): firebase.Promise<any> {
    // user id
    const userId = this._afAuth.auth.currentUser.uid;
    // get the group push ID
    let groupRef = firebase.database().ref('groups').push();

    console.log('groupRef.key: ' + groupRef.key);
    // set group info
    return groupRef.set({
      name: name,
      type: type
    }).then( _ => {
      this._afDb.object('userGroups/' + userId).update({
        [groupRef.key]: {
          name: name,
          type: type,
        }
      });
    });
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