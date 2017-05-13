import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Store } from '@ngrx/store';
import { State, getDiagramId } from '../../redux/reducers';
import {
  AddViewModelAction,
  UpdateViewModelAction,
  DeleteViewModelAction
} from '../../redux/actions/view-model';
import { ViewModel } from '../../data-model';

@Injectable()
export class ViewModelDataService {
  private firebaseRef: FirebaseListObservable<ViewModel[]>;
  protected url: string;

  constructor(
    private af: AngularFire,
    private store: Store<State>
  ) {
    this.url = '/view-elements';
    this.store.select(getDiagramId)
      .subscribe(diagramId => {
        if (!diagramId) {
          return;
        }
        this.initialize(diagramId);
      });
  }

  public add(element: ViewModel) {
    if (!this.isConnectionExist()) {
      return;
    }
    this.firebaseRef.push(element);
  }

  public update(id: string, element: ViewModel) {
    if (!this.isConnectionExist()) {
      return;
    }
    const updatedView = Object.assign({}, element);
    delete updatedView.$key;
    this.firebaseRef.update(id, updatedView);
  }

  public remove(id: string) {
    if (!this.isConnectionExist()) {
      return;
    }
    this.firebaseRef.remove(id);
  }

  protected initialize(diagramId: string) {
    const path = `${this.url}/${diagramId}`;

    this.firebaseRef = this.af.database.list(path);

    this.firebaseRef.$ref.on('child_added', this.childAddedEvent.bind(this));
    this.firebaseRef.$ref.on('child_changed', this.childChangedEvent.bind(this));
    this.firebaseRef.$ref.on('child_removed', this.childRemovedEvent.bind(this));
  }

  protected childAddedEvent(data: firebase.database.DataSnapshot) {
    let newData = Object.assign({}, data.val());
    newData['$key'] = data.key;
    this.store.dispatch(new AddViewModelAction({id: data.key, element: newData}));
  }

  protected childChangedEvent(data: firebase.database.DataSnapshot) {
    let newData = Object.assign({}, data.val());
    newData['$key'] = data.key;
    this.store.dispatch(new UpdateViewModelAction({id: data.key, element: newData}));
  }

  protected childRemovedEvent(data: firebase.database.DataSnapshot) {
    this.store.dispatch(new DeleteViewModelAction(data.key));
  }

  private isConnectionExist(): boolean {
    if (!this.firebaseRef) {
      console.log('ViewModelDataService: database connection not exist');
      return false;
    }
    return true;
  }
}
