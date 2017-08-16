/**
  * Import Angular
  */

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/**
  * Import Ionic
  */

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage';

/**
  * Import AngularFire
  */

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

/**
  * Import Components/Directives/Etc
  */

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

/**
  * Import Ionic Native elements
  */

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Sim } from '@ionic-native/sim';

// import { NativeFirebasePhoneAuth } from '@ionic-native/native-firebase-phone-auth';


/**
  * Global Providers
  */

import { AuthProvider } from '../providers/auth/auth';
import { ToastProvider } from '../providers/toast/toast';
import { LocalUserDataProvider } from '../providers/local-user-data/local-user-data';
import { UtilProvider } from '../providers/util/util';
import { PhoneInfoProvider } from '../providers/phone-info/phone-info';
import { AuthFirebaseProvider } from '../providers/auth-firebase/auth-firebase';

export const firebaseConfig = {
  apiKey: "AIzaSyAHcTUa4OCQ4Y70vViz9k-3JXGQnE-fAIM",
  authDomain: "grouper-688c6.firebaseapp.com",
  databaseURL: "https://grouper-688c6.firebaseio.com",
  projectId: "grouper-688c6",
  storageBucket: "grouper-688c6.appspot.com",
  messagingSenderId: "962335159142"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  exports: [
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ToastProvider,
    Sim,
    LocalUserDataProvider,
    UtilProvider,
    PhoneInfoProvider,
    AuthFirebaseProvider,
    // NativeFirebasePhoneAuth
  ]
})
export class AppModule {}
