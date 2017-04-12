import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import 'hammerjs';

import { StoreModule } from '@ngrx/store';
import { appReducer } from './shared/reducers';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { FirebaseService } from './shared/db.service';

import { AppComponent } from './app.component';
import { DevelopViewComponent } from './develop-view/develop-view.component';

import { ToolbarComponent } from './shared/components/toolbar';
import { SidenavComponent } from './shared/components/sidenav';
import { SidebarComponent } from './shared/components/sidebar';
import { ElementExplorerComponent } from './shared/components/sidebar/element-explorer';
import { ProjectExplorerComponent } from './shared/components/sidebar/project-explorer';
import { InstrumentalPanelComponent } from './shared/components/instrumental-panel';

import { AuthService, FirebaseAuthService } from './shared/services/auth';
import { ProjectService, FirebaseProjectService } from './shared/services/project';
import { DiagramService, FirebaseDiagramService } from './shared/services/diagram';


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
    SidebarComponent,
    ElementExplorerComponent,
    ProjectExplorerComponent,
    InstrumentalPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule.provideStore(appReducer),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  providers: [
    FirebaseService,
    FirebaseProjectService,
    { provide: AuthService, useClass: FirebaseAuthService },
    { provide: ProjectService, useClass: FirebaseProjectService },
    { provide: DiagramService, useClass: FirebaseDiagramService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
