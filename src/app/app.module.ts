import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import 'hammerjs';

import { StoreModule } from '@ngrx/store';
import { appReducer } from './shared/redux/reducers';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { SidebarModule } from './ui-components/sidebar';

import { AppComponent } from './app.component';
import { DevelopViewComponent } from './ui-components/develop-view/develop-view.component';

import { ToolbarComponent } from './ui-components/toolbar';
import { SidenavComponent } from './ui-components/sidenav';
import { InstrumentalPanelComponent } from './ui-components/instrumental-panel';

import { AuthService, FirebaseAuthService } from './shared/services/auth-service';

import { DragManagerService } from './shared/services/drag-manager-service';

import {
  ProjectDataService,
  DiagramDataService,
  ObjectModelDataService,
  ViewModelDataService
} from './shared/services/data-services';
import {
  ProjectService,
  DiagramService,
  ObjectModelService,
  ViewModelService
} from './shared/services/model-services';


const firebaseConfig = {
    apiKey: 'AIzaSyCIp2-7wO-aD2Y2eoD0_z6GC4qnXGGrEgM',
    authDomain: 'uml-editor-89c08.firebaseapp.com',
    databaseURL: 'https://uml-editor-89c08.firebaseio.com',
    projectId: 'uml-editor-89c08',
    storageBucket: 'uml-editor-89c08.appspot.com',
    messagingSenderId: '729173763'
  };

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent,
    DevelopViewComponent,
    ToolbarComponent,
    SidenavComponent,
    InstrumentalPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    SidebarModule,
    StoreModule.provideStore(appReducer),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  providers: [
    ProjectDataService,
    DiagramDataService,
    ObjectModelDataService,
    ViewModelDataService,
    ProjectService,
    DiagramService,
    ObjectModelService,
    ViewModelService,
    { provide: AuthService, useClass: FirebaseAuthService },
    DragManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
