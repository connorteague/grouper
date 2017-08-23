import { Observable } from 'rxjs/Rx';
/*
 * This provider 
*/



import { Injectable, PACKAGE_ROOT_URL } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';


@Injectable()
export class HomePageProvider {

  public userGroups: FirebaseListObservable<any>;

  // returns true if the user is apart of any groups, false if they are not.
  // You must subscribe to this value inside of the component you are using it.
  public userHasGroup: Observable<boolean>;

  userGroupsRef: FirebaseListObservable<any>;

  constructor(
    private _afAuth: AngularFireAuth,
    private _afDb: AngularFireDatabase)
  {
    const authListener = this._afAuth.authState.subscribe( user => {
      if (user) {
        // console.log('home page provider user was true');
        this.userGroups = this._afDb.list(`userGroups/${user.uid}`);
        authListener.unsubscribe();
      } else {

      }
    })
  }

}


// usersRef.once('value', function(snapshot) {
//   if (snapshot.hasChild(theDataToAdd)) {
//     alert('exists');
//   }
// });