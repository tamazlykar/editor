import { Injectable } from '@angular/core';
import { DiagramService } from './diagram.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Diagram } from '../../interfaces';

@Injectable()
export class FirebaseDiagramService extends DiagramService {
private firebaseRef: FirebaseListObservable<Diagram[]>;

  constructor(private af: AngularFire, store: Store<State>) {
    super(store);

    this.url = '/diagrams';
    this.dataStore = { diagrams: [] };
    this._diagrams = new BehaviorSubject<Diagram[]>([]);
    this.diagrams = this._diagrams.asObservable();
  }

  public add(diagram: Diagram) {
    if (!this.isConnectionExist()) {
      return;
    }
    this.firebaseRef.push(diagram);
  }

  public update(key: string, diagram: Diagram) {
    if (!this.isConnectionExist()) {
      return;
    }
    const updatedDiagram = Object.assign({}, diagram);
    delete updatedDiagram.$key;
    this.firebaseRef.update(key, updatedDiagram);
  }

  public delete(key: string) {
    if (!this.isConnectionExist()) {
      return;
    }
    this.firebaseRef.remove(key);
  }

  public load() {}

  protected initialize(projectId: string) {
    this.firebaseRef = this.af.database.list(`${this.url}/${projectId}`);
    this.firebaseRef.subscribe((diagrams: Diagram[]) => {
      this.dataStore.diagrams = diagrams;
      this._diagrams.next(Object.assign({}, this.dataStore).diagrams);
    });
  }

  private isConnectionExist(): boolean {
    if (!this.firebaseRef) {
      console.log('Diagram Service: database conneection not exist');
      return false;
    }
    return true;
  }
}
