import { log } from 'util';
import { resolve } from 'url';
import { FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';
import { Component, PACKAGE_ROOT_URL, ViewChild } from '@angular/core';

import { IonicPage, ModalController, Nav, NavController, NavParams, Events, ViewController, App} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { HomePageProvider } from '../../providers/home-page/home-page';
import { GroupsProvider } from '../../providers/groups/groups';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  // @ViewChild(Nav) nav: Nav;


  public userHasGroup: boolean;
  public userId;

  userGroups: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public appCtrl: App,
    public events: Events,
    private _afDb: AngularFireDatabase,
    private _afAuth: AngularFireAuth,
    public storage: Storage,
    public modalCtrl: ModalController,
    public homePageProivider: HomePageProvider,
    public groupsProvider: GroupsProvider
  ) {
  }

  ionViewDidLoad() {
    this.userGroups = this.homePageProivider.userGroups;
  }


  createGroup() {
    // define the new group modal.
    let newGroupModal = this.modalCtrl.create('CreateGroupPage');
    // we have to implement any listening login now before we present the modal.
    newGroupModal.onDidDismiss(data => {
      // console.log(data);
    });
    // present the modal
    newGroupModal.present();
  }

  openGroup(group) {
    // console.log('group id should be : ' + group.$key)
    this.events.publish('group:selected', group.$key);

    const root = this.appCtrl.getRootNav();

    console.log(this.appCtrl._appRoot);

    // console.log(this.navCtrl.getActive());

    // console.log('parent nav is: ' + this.navCtrl.parent);
    // console.dir(this.navCtrl.parent);
  }

  openSearchModal() {

  }

}
