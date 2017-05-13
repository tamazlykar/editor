import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Store } from '@ngrx/store';
import { State, getProjectId } from '../../redux/reducers';
import {
  AddObjectModelAction,
  UpdateObjectModelAction,
  DeleteObjectModelAction
} from '../../redux/actions/object-model';
import { ObjectModel } from '../../data-model';

@Injectable()
export class ObjectModelDataService {
  private firebaseRef: FirebaseListObservable<ObjectModel[]>;
  protected url: string;

  constructor(
    private af: AngularFire,
    private store: Store<State>
  ) {
    this.url = '/model-elements';
    this.store.select(getProjectId)
      .subscribe(projectId => {
        if (!projectId) {
          return;
        }
        this.initialize(projectId);
      });
  }

  public add(element: ObjectModel): Promise<string> {
    return new Promise((resolve) => {
      if (!this.isConnectionExist()) {
        resolve(null);
      }
      this.firebaseRef.push(element).then(item => {
        resolve(item.key);
      });
    });
  }

  public update(id: string, element: ObjectModel) {
    if (!this.isConnectionExist()) {
      return;
    }
    const updatedModel = Object.assign({}, element);
    delete updatedModel.$key;
    this.firebaseRef.update(id, updatedModel);
  }

  public remove(id: string) {
    if (!this.isConnectionExist()) {
      return;
    }
    this.firebaseRef.remove(id);
  }

  protected initialize(projectId: string) {
    const path = `${this.url}/${projectId}`;

    this.firebaseRef = this.af.database.list(path);

    this.firebaseRef.$ref.on('child_added', this.childAddedEvent.bind(this));
    this.firebaseRef.$ref.on('child_changed', this.childChangedEvent.bind(this));
    this.firebaseRef.$ref.on('child_removed', this.childRemovedEvent.bind(this));
  }

  protected childAddedEvent(data: firebase.database.DataSnapshot) {
    let newData = Object.assign({}, data.val());
    newData['$key'] = data.key;
    this.store.dispatch(new AddObjectModelAction({id: data.key, element: newData}));
  }

  protected childChangedEvent(data: firebase.database.DataSnapshot) {
    let newData = Object.assign({}, data.val());
    newData['$key'] = data.key;
    this.store.dispatch(new UpdateObjectModelAction({id: data.key, element: newData}));
  }

  protected childRemovedEvent(data: firebase.database.DataSnapshot) {
    this.store.dispatch(new DeleteObjectModelAction(data.key));
  }

  private isConnectionExist(): boolean {
    if (!this.firebaseRef) {
      console.log('ObjectModelDataService: database connection not exist');
      return false;
    }
    return true;
  }
}
