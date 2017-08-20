/*

  This provider watches certain nodes of the database, and syncs the local storage accordingly.

*/

import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';




@Injectable()
export class LocalStorageSyncProvider {

  constructor(
    private _afAuth: AngularFireAuth,
    private _afDb: AngularFireDatabase,
    private _storage: Storage
  ) {
    
  }

  watchGroups() {
    
  }



}
