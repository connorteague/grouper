import { Injectable } from '@angular/core';

import { Sim } from '@ionic-native/sim';


@Injectable()
export class SimInfoProvider {

  public simInfo;

  constructor(
    private _sim: Sim
  ) {
    this._sim.getSimInfo().then(
      (info) => {
        this.simInfo = info;
      }, (err) => {
        console.log('Unable to get sim info: ', err)
        this.simInfo = false;
      }
    )
  }

}
