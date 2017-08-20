import { Component, ViewChild } from '@angular/core';

import { IonicPage, Events, NavController, NavParams, Slides } from 'ionic-angular';

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
    public storage: Storage,
    public events: Events) {
  }

  startApp() {
    this.navCtrl.setRoot(HomePage).then(() => {
      // turtorial is over(or user quit tutorial) lets publish an event to show the main nav menu.
      this.events.publish('homeMenu:enable');
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
