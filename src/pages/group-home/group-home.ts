import { FirebaseObjectObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GroupsProvider } from '../../providers/groups/groups';



@IonicPage()
@Component({
  selector: 'page-group-home',
  templateUrl: 'group-home.html',
})
export class GroupHomePage {

  currentGroup: FirebaseObjectObservable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public groupsProvider: GroupsProvider) {
      
  }

  ionViewDidLoad() {
    this.currentGroup = this.groupsProvider.currentGroup;

    
    // console.log('navCtrl.parent : '  + this.navCtrl.parent);
  }

}
