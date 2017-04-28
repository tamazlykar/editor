import { Component, ViewChild, OnInit } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {
  State,
  getSidenavState,
  getUserId,
  getProjectId,
  getDiagramId,
  getModelElementId,
  getViewElementId
} from './shared/reducers';
import * as ui from './shared/actions/ui-state';
import * as app from './shared/actions/app-state';

import { AuthService, ProjectService } from './shared/services';

import { ClassModel } from './shared/model2/object-model/class';
import { AttributeModel } from './shared/model2/object-model/attribute';

@Component({
  selector: 'uml-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private sidenavOpened$: Observable<boolean>;
  @ViewChild(MdSidenav)
  private mdSidenavComponent: MdSidenav;

  constructor(private store: Store<State>, private authService: AuthService, private projectService: ProjectService) {
    this.authService.login('tadani7@gmail.com', '07021995');

    this.printAppStates();

    // select 1 project in list
    this.projectService.projects.subscribe((projects: any[]) => {
      if (projects.length === 0) {
        return;
      }
      console.log('App: projects', projects);
      const projectId = projects[0].$key;
      this.projectService.set(projectId);
    });

    this.store.select(getDiagramId).subscribe( value => {
      if (!value) {
        return;
      }

      console.log('diagram', value);


    });
  }

  public ngOnInit() {
    this.store.select(getSidenavState)
      .subscribe((state: boolean) => {
        if (!state) {
          return;
        }
        this.open();
      });

    this.mdSidenavComponent.onClose
      .subscribe(() => {
        this.store.dispatch(new ui.CloseSidenavAction());
      });
  }

  private open() {
    this.mdSidenavComponent.open();
  }



  public printAppStates() {
    this.store.select(getUserId).subscribe(val => console.log('Store: userId', val));
    this.store.select(getProjectId).subscribe(val => console.log('Store: projectId', val));
    this.store.select(getDiagramId).subscribe(val => console.log('Store: diagramId', val));
    this.store.select(getModelElementId).subscribe(val => console.log('Store: modelElementId', val));
    this.store.select(getViewElementId).subscribe(val => console.log('Store: viewElementId', val));
  }
}
