import { Component, ViewChild } from '@angular/core';

import { IonicPage, NavController, Slides, MenuController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';



@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

  showSkip = true;

  @ViewChild('slides') slides: Slides;

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public menu: MenuController)
  {
  }

  startApp() {
    this.navCtrl.push(HomePage).then( () => {
      this.storage.set('hasSeenTutorial', 'true');
    })
  }

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

  ionViewWillEnter() {
    this.slides.update();
  }

  ionViewDidEnter() {

  }



}
