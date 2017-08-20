// IMPORT ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Sim } from '@ionic-native/sim';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';

import { AuthProvider } from '../providers/auth/auth';
import { AuthFirebaseProvider } from '../providers/auth-firebase/auth-firebase';
import { ToastProvider } from '../providers/toast/toast';
import { SimInfoProvider } from '../providers/sim-info/sim-info';
import { SignUpProvider } from '../providers/sign-up/sign-up';
import { CreateGroupProvider } from '../providers/create-group/create-group';
import { GroupsProvider } from '../providers/groups/groups';
import { LocalStorageSyncProvider } from '../providers/local-storage-sync/local-storage-sync';

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
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Sim,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AuthFirebaseProvider,
    ToastProvider,
    SimInfoProvider,
    SignUpProvider,
    CreateGroupProvider,
    GroupsProvider,
    LocalStorageSyncProvider
  ]
})
export class AppModule {}
