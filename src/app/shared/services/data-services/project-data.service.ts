import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Store } from '@ngrx/store';
import { State, getUserId } from '../../redux/reducers';
import { ProjectModel } from '../../data-model';
import { AddProjectAction, UpdateProjectAction, RemoveProjectAction} from '../../redux/actions/project';

@Injectable()
export class ProjectDataService {
  private firebaseRef: FirebaseListObservable<ProjectModel[]>;
  private url: string;

  constructor(private af: AngularFire, private store: Store<State>) {
    this.url = '/projects';

    this.store.select(getUserId)
      .subscribe((userId: string) => {
        if (!userId) {
          return;
        }
        this.initialize(userId);
      });
  }

  public add(project: ProjectModel) {
    if (!this.isConnectionExist()) {
      return;
    }
    this.firebaseRef.push(project);
  }

  public update(id: string, project: ProjectModel) {
    if (!this.isConnectionExist()) {
      return;
    }
    const updatedProject = Object.assign({}, project);
    delete updatedProject.$key;
    this.firebaseRef.update(id, updatedProject);
  }

  public remove(id: string) {
    if (!this.isConnectionExist()) {
      return;
    }
    this.firebaseRef.remove(id);
  }

  private initialize(userId: string) {
    const path = `${this.url}/${userId}`;
    this.firebaseRef = this.af.database.list(path);

    this.firebaseRef.$ref.on('child_added', this.childAddedEvent.bind(this));
    this.firebaseRef.$ref.on('child_changed', this.childChangedEvent.bind(this));
    this.firebaseRef.$ref.on('child_removed', this.childRemovedEvent.bind(this));
  }

  protected childAddedEvent(data: firebase.database.DataSnapshot) {
    let newData = Object.assign({}, data.val());
    newData['$key'] = data.key;
    this.store.dispatch(new AddProjectAction(newData));
  }

  protected childChangedEvent(data: firebase.database.DataSnapshot) {
    let newData = Object.assign({}, data.val());
    newData['$key'] = data.key;
    this.store.dispatch(new UpdateProjectAction({id: data.key, element: newData}));
  }

  protected childRemovedEvent(data: firebase.database.DataSnapshot) {
    this.store.dispatch(new RemoveProjectAction(data.key));
  }

  private isConnectionExist(): boolean {
    if (!this.firebaseRef) {
      console.log('ProjectDataService: database connection not exist');
      return false;
    }
    return true;
  }
}
