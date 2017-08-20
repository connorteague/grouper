import { Component, ViewChild } from '@angular/core';

import { Events, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  appPages: PageInterface[] = [
    {title: 'Groups', name: 'HomeTabsPage', component: 'HomeTabsPage', tabComponent: 'HomePage', index: 0, icon: 'logo-css3'},
    {title: 'Messages', name: 'HomeTabsPage', component: 'HomeTabsPage', tabComponent: 'MessagesPage', index: 1, icon: 'chatboxes'},
    {title: 'My Account', name: 'MyAccountPage', component: 'MyAccountPage', icon: 'settings'},
  ];

  homeMenuEnabled: boolean;

  rootPage: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private _afAuth: AngularFireAuth,
    public events: Events) {

    const authListener = this._afAuth.authState.subscribe( user => {
      if( user ) {
        this.nav.setRoot('HomeTabsPage');
        this.homeMenuEnabled = true;
        authListener.unsubscribe();
      } else {
        this.homeMenuEnabled = false;
        this.nav.setRoot('LandingPage');
        // this.nav.setRoot(HomePage);
        authListener.unsubscribe();
      }
    })
    
    this.initializeApp(); 

    this.listenToLoginEvents();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.homeMenuEnabled = true;
    });
    this.events.subscribe('user:signup', () => {
      this.homeMenuEnabled = true;
    });
    this.events.subscribe('user:logout', () => {
      this.homeMenuEnabled = false;
    });
    this.events.subscribe('homeMenu:enable', () => {
      this.homeMenuEnabled = true;
    });
    this.events.subscribe('homeMenu:disable', () =>{
      this.homeMenuEnabled = false;
    })
  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }
    // console.log('active child navs: ' + this.nav.getActiveChildNavs().length);

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      // NOTE: this is where I will need to specify an ID of the activeChildNav, in this case the tab controller.
      // '0' is a reference to the first item in the list returned from 'getActiveChildNave(), I will need to replace 
      // 0 with a variable that connects it to a spscific tab/nav controller.
      this.nav.getActiveChildNavs()[0].select(page.index);
      // console.log('page.index: ' + page.index + ' | ' + 'page.name ' + page.name);
      // console.dir(params);
      
    // Set the root of the nav with params if it's a tab index
    } else {
      this.nav.setRoot(page.component, params).catch((err: any) => {
        // console.log(`Didn't set nav root: ${err}`);
      });
    }
  }


  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }
}
