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
  getViewElementId,
  getProjectListState
} from './shared/redux/reducers';
import * as ui from './shared/redux/actions/ui';
import { AuthService } from './shared/services/auth-service';
import { ProjectService, DiagramService } from './shared/services/model-services';

@Component({
  selector: 'uml-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private sidenavOpened$: Observable<boolean>;
  @ViewChild(MdSidenav)
  private mdSidenavComponent: MdSidenav;

  constructor(
    private store: Store<State>,
    private authService: AuthService,
    private projectService: ProjectService,
    private diagramService: DiagramService
  ) {
    this.autoselect();
    this.printStore();
  }

  public ngOnInit() {
    this.store.select(getSidenavState)
      .subscribe((state: boolean) => {
        if (!state) {
          this.close();
        } else {
          this.open();
        }
      });

    this.mdSidenavComponent.onClose
      .subscribe(() => {
        this.store.dispatch(new ui.CloseSidenavAction());
      });
  }

  private open() {
    this.mdSidenavComponent.open();
  }

  private close() {
    this.mdSidenavComponent.close();
  }




  public printStore() {
    this.store.distinctUntilChanged().subscribe(a => {console.log('Store:', a)});
  }

  public autoselect() {
    this.autentification();
    this.selectProject();
    this.selectDiagram();
  }

  public autentification() {
    this.authService.login('tadani7@gmail.com', '07021995');
  }

  public selectProject() {
    // select 1 project in list
    this.projectService.projects$.subscribe((projects: any[]) => {
      if (projects.length === 0) {
        return;
      }
      const projectId = projects[0].$key;
      this.projectService.setCurrent(projectId);
    });
    this.projectService.currentProject$.subscribe(p => console.log('CurrentProject:', p));
  }

  public selectDiagram() {
    this.diagramService.diagrams$.subscribe((diagrams: any[]) => {
      if (diagrams.length === 0) {
        return;
      }
      const diagramId = diagrams[0].$key;
      this.diagramService.setCurrent(diagramId);
    });
    this.diagramService.currentDiagram$.subscribe(d => console.log('CurrentDiagram:', d));

  }

  public printAppStates() {
    this.store.select(getUserId).subscribe(val => console.log('Store: userId', val));
    this.store.select(getProjectId).subscribe(val => console.log('Store: projectId', val));
    this.store.select(getDiagramId).subscribe(val => console.log('Store: diagramId', val));
    this.store.select(getModelElementId).subscribe(val => console.log('Store: modelElementId', val));
    this.store.select(getViewElementId).subscribe(val => console.log('Store: viewElementId', val));
  }
}
