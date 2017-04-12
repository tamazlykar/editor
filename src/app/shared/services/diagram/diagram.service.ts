import { Store } from '@ngrx/store';
import { State, getProjectId } from '../../reducers';
import * as app from '../../actions/app-state';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Diagram } from '../../interfaces';

export abstract class DiagramService {
  public diagrams: Observable<Diagram[]>;
  protected _diagrams: BehaviorSubject<Diagram[]>;
  protected dataStore: { diagrams: Diagram[] };
  protected url: string;

  constructor(protected store: Store<State>) {
    this.store.select(getProjectId)
      .subscribe((projectId: string) => {
        if (!projectId) {
          return;
        }
        this.initialize(projectId);
      });
  }

  public abstract add(diagram: Diagram): void;
  public abstract update(key: string, diagram: Diagram): void;
  public abstract delete(key: string): void;
  public abstract load(): void;

  public set(diagramId: string): void {
    this.store.dispatch(new app.SetDiagramAction(diagramId));
  }

  protected abstract initialize(projectId: string): void;
}
