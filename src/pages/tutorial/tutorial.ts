import { Component, ViewChild } from '@angular/core';

import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

  showSkip: boolean = true;

  @ViewChild('slides') slides: Slides

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }

  startApp() {
    this.navCtrl.setRoot(HomePage).then(() => {
      this.storage.set('hasSeenTutorial', 'true');
    })
  }

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

  ionViewWillEnter() {
		this.slides.update();
	}

}
