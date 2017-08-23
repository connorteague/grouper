import { log } from 'util';
import { GroupedObservable } from 'rxjs/operator/groupBy';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, ModalController, Events, NavController, NavParams, Loading, LoadingController, AlertController, ViewController, App } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { ToastProvider } from '../../../../providers/toast/toast';

import { GroupsProvider } from '../../../../providers/groups/groups';

import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-create-group',
  templateUrl: 'create-group.html',
})
export class CreateGroupPage {

  createGroupForm: FormGroup;

  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private _fb: FormBuilder,
    public storage: Storage,
    private _toastProvider: ToastProvider,
    public events: Events,
    public appCtrl: App,
    public groupsProvider: GroupsProvider,
    public viewCtrl: ViewController)
  {
    this.buildGroupForm();
  }

  ionViewDidLoad() {
    // console.log('active navs are: ' );
    // console.dir(this.app.getActiveNavs());
    
  }

  buildGroupForm() {
    this.createGroupForm = this._fb.group({
      name: ['', [
        Validators.required
      ]],
      type: ['friend', [
        Validators.required
      ]]
    })
  }

  onSubmit() {
    if (this.createGroupForm.invalid) {
      // do something then return.
      return;
    } else {
      this.groupsProvider.createGroup(this.createGroupForm.value.name, this.createGroupForm.value.type).then( newGroup => {
        console.log('group was created.');
        // dismiss the lodaing controller
        this.loading.dismiss().then( _ => {
          // 1. dismiss the modal.
          this.viewCtrl.dismiss();
          // 2. Use the appCtrl to navigate from the modal.
          this.appCtrl.getRootNav().push('GroupTabsPage', newGroup);
          // what does .getRootNav() return?
          console.log("this.appCtrl.getRootNav() : "  + this.appCtrl.getRootNav());
        })        
      }, error => {
        this.loading.dismiss().then( _ => {
          let alert = this.alertCtrl.create({
            title: error.name,
            subTitle: error.message,
            buttons: ['Dismiss']
          });
          alert.present();
        })
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  cancel() {
    this.navCtrl.pop().then(_ => {
      this.events.publish('homeMenu:enable');
    }, error => {
      this.navCtrl.setRoot('HomeTabsPage').then(_ => {
        this.events.publish('homeMenu:enable');
      })
    })
  }


}
