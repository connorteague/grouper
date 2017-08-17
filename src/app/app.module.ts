// IMPORT ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AuthProvider } from '../providers/auth/auth';
import { AuthFirebaseProvider } from '../providers/auth-firebase/auth-firebase';
import { ToastProvider } from '../providers/toast/toast';


// Firebase Configuration.
export const firebaseConfig = {
  apiKey: "AIzaSyAHcTUa4OCQ4Y70vViz9k-3JXGQnE-fAIM",
  authDomain: "grouper-688c6.firebaseapp.com",
  databaseURL: "https://grouper-688c6.firebaseio.com",
  projectId: "grouper-688c6",
  storageBucket: "grouper-688c6.appspot.com",
  messagingSenderId: "962335159142"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AuthFirebaseProvider,
    ToastProvider
  ]
})
export class AppModule {}
