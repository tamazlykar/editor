import { Injectable } from '@angular/core';
import { ModelElementService } from './model-element.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ModelElement } from '../../interfaces';

@Injectable()
export class FirebaseModelElementService extends ModelElementService {
  private firebaseRef: FirebaseListObservable<ModelElement[]>;
  private fbClassesRef: FirebaseListObservable<ModelElement[]>;
  private fbInterfacesRef: FirebaseListObservable<ModelElement[]>;
  private fbDependenciesRef: FirebaseListObservable<ModelElement[]>;

  constructor(private af: AngularFire, store: Store<State>) {
    super(store);

    this.url = '/model-elements';
    this.dataStore = {
      classes: [],
      interfaces: [],
      dependencies: []
    };
    this._classes = new BehaviorSubject<ModelElement[]>([]);
    this._interfaces = new BehaviorSubject<ModelElement[]>([]);
    this._dependecies = new BehaviorSubject<ModelElement[]>([]);
    this.classes = this._classes.asObservable();
    this.interfaces = this._interfaces.asObservable();
    this.dependencies = this._dependecies.asObservable();
  }

  public add() {}

  public update() {}

  public delete() {}



  public load() {}

  protected initialize(projectId: string) {
    const path = `${this.url}/${projectId}`;

    this.fbClassesRef = this.af.database.list(`${path}/classes`);
    this.fbClassesRef.subscribe((classes: ModelElement[]) => {
      this.dataStore.classes = classes;
      this._classes.next(Object.assign({}, this.dataStore).classes);
    });
  }

  private isConnectionExist(): boolean {
    if (!this.firebaseRef) {
      console.log('Model-ElementModel Service: database conneection not exist');
      return false;
    }
    return true;
  }
}
