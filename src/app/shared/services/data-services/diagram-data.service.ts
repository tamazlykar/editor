import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Store } from '@ngrx/store';
import { State, getProjectId } from '../../redux/reducers';
import { DiagramModel } from '../../data-model';
import { AddDiagramAction, UpdateDiagramAction, RemoveDiagramAction} from '../../redux/actions/diagram';

@Injectable()
export class DiagramDataService {
  private firebaseRef: FirebaseListObservable<DiagramModel[]>;
  private url: string;

  constructor(private af: AngularFire, private store: Store<State>) {
    this.url = '/diagrams';

    this.store.select(getProjectId)
      .subscribe((projectId: string) => {
        if (!projectId) {
          return;
        }
        this.initialize(projectId);
      });
  }

  public add(diagram: DiagramModel) {
    if (!this.isConnectionExist()) {
      return;
    }
    this.firebaseRef.push(diagram);
  }

  public update(id: string, diagram: DiagramModel) {
    if (!this.isConnectionExist()) {
      return;
    }
    const updatedProject = Object.assign({}, diagram);
    delete updatedProject.$key;
    this.firebaseRef.update(id, updatedProject);
  }

  public remove(id: string) {
    if (!this.isConnectionExist()) {
      return;
    }
    this.firebaseRef.remove(id);
  }

  private initialize(projectId: string) {
    const path = `${this.url}/${projectId}`;
    this.firebaseRef = this.af.database.list(path);

    this.firebaseRef.$ref.on('child_added', this.childAddedEvent.bind(this));
    this.firebaseRef.$ref.on('child_changed', this.childChangedEvent.bind(this));
    this.firebaseRef.$ref.on('child_removed', this.childRemovedEvent.bind(this));
  }

  protected childAddedEvent(data: firebase.database.DataSnapshot) {
    let newData = Object.assign({}, data.val());
    newData['$key'] = data.key;
    this.store.dispatch(new AddDiagramAction(newData));
  }

  protected childChangedEvent(data: firebase.database.DataSnapshot) {
    let newData = Object.assign({}, data.val());
    newData['$key'] = data.key;
    this.store.dispatch(new UpdateDiagramAction({id: data.key, element: newData}));
  }

  protected childRemovedEvent(data: firebase.database.DataSnapshot) {
    this.store.dispatch(new RemoveDiagramAction(data.key));
  }

  private isConnectionExist(): boolean {
    if (!this.firebaseRef) {
      console.log('DiagramDataService: database connection not exist');
      return false;
    }
    return true;
  }
}
