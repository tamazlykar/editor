import { Injectable } from '@angular/core';
import { ProjectService } from './project.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Project } from '../../interfaces';

@Injectable()
export class FirebaseProjectService extends ProjectService {
  private firebaseRef: FirebaseListObservable<Project[]>;

  constructor(private af: AngularFire, store: Store<State>) {
    super(store);

    this.url = '/projects';
    this.dataStore = { projects: [] };
    this._projects = new BehaviorSubject<Project[]>([]);
    this.projects = this._projects.asObservable();
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


  public load() {}

  protected initialize(userId: string) {
    this.firebaseRef = this.af.database.list(`${this.url}/${userId}`);
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
