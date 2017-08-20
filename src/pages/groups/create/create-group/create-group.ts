import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, ModalController, App, Events, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { ToastProvider } from '../../../../providers/toast/toast';

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
    public app: App)
  {
    this.buildGroupForm();
  }

  ionViewDidLoad() {
    console.log('active navs are: ' );
    console.dir(this.app.getActiveNavs());
    
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
      this.navCtrl.push('AddGroupLocationPage', {title: ''});
    }
  }


}
