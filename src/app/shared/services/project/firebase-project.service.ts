import { Injectable } from '@angular/core';
import { ProjectService } from './project.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import * as app from '../../actions/app-state';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Project } from '../../interfaces';

@Injectable()
export class FirebaseProjectService extends ProjectService {
  private firebaseRef: FirebaseListObservable<Project[]>;

  constructor(private af: AngularFire, store: Store<State>) {
    super(store);

    this.url = '/projects';
    this.dataStore = {
      projects: [],
      currentProject: null
    };
    this._projects = new BehaviorSubject<Project[]>([]);
    this._currentProject = new BehaviorSubject<Project>(null);
    this.projects = this._projects.asObservable();
    this.currentProject = this._currentProject.asObservable();
  }

  public add(project: Project) {
    if (!this.isConnectionExist()) {
      return;
    }
    this.firebaseRef.push(project);
  }

  public update(key: string, project: Project) {
    if (!this.isConnectionExist()) {
      return;
    }
    const updatedProject = Object.assign({}, project);
    delete updatedProject.$key;
    this.firebaseRef.update(key, updatedProject);
  }

  public delete(key: string) {
    if (!this.isConnectionExist()) {
      return;
    }
    this.firebaseRef.remove(key);
  }

  public set(projectId: string): void {
    this.store.dispatch(new app.SetProjectAction(projectId));
    this.af.database.object(`${this.url}/${this.userId}/${projectId}`)
      .subscribe((project: Project) => {
        this.dataStore.currentProject = project;
        this._currentProject.next(Object.assign({}, this.dataStore).currentProject);
      });
  }

  public load() {}

  protected initialize() {
    this.firebaseRef = this.af.database.list(`${this.url}/${this.userId}`);
    this.firebaseRef.subscribe((projects: Project[]) => {
      this.dataStore.projects = projects;
      this._projects.next(Object.assign({}, this.dataStore).projects);
    });
  }

  private isConnectionExist(): boolean {
    if (!this.firebaseRef) {
      console.log('Project Service: database conneection not exist');
      return false;
    }
    return true;
  }
}
