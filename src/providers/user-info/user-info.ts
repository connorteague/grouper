import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { Sim } from '@ionic-native/sim';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';

@Injectable()
export class UserInfoProvider {

  simCountryCode: string;


  constructor(
    private _afAuth: AngularFireAuth,
    private sim: Sim
  )
  {

  }
  init(){
    this.checkAuthState();
  }

  getCountryCode(){
    return this.sim.getSimInfo().then(
      (info) => {
        return info.countryCode;
      },
      (err) => {
        console.log('Unable to get sim info: ', err)
      }
    )
  }

  checkAuthState(){
    const authListener = this._afAuth.authState.subscribe(user => {
      if(user){
        console.log("There was a user.");
        authListener.unsubscribe();
        return;
      } else {
        this.sim.getSimInfo().then(
          (info) => {
            this.simCountryCode = info.countryCode.toUpperCase();
            console.log('Sim info is!!: ' + info.countryCode);
          },
          (err) => console.log('Unable to get sim info: ', err)
        )
      }
    })
  }



}
