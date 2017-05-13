import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AppComponent} from './app.component';
import {DevelopViewComponent} from './ui-components/develop-view/develop-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/develop', pathMatch: 'full' },
  { path: 'editor',  component: AppComponent },
  { path: 'develop',     component: DevelopViewComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
