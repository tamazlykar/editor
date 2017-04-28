import { Store } from '@ngrx/store';
import { State, getProjectId } from '../../reducers';
import * as app from '../../actions/app-state';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ModelElement } from '../../interfaces';

export abstract class ModelElementService {
  public classes: Observable<ModelElement[]>;
  public interfaces: Observable<ModelElement[]>;
  public dependencies: Observable<ModelElement[]>;
  protected _classes: BehaviorSubject<ModelElement[]>;
  protected _interfaces: BehaviorSubject<ModelElement[]>;
  protected _dependecies: BehaviorSubject<ModelElement[]>;
  protected dataStore: {
    classes: ModelElement[],
    interfaces: ModelElement[],
    dependencies: ModelElement[]
  };
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

  public abstract add(element: ModelElement): void;
  public abstract update(key: string, element: ModelElement): void;
  public abstract delete(key: string): void;
  public abstract load(): void;

  public set(elementId: string): void {
    this.store.dispatch(new app.SetModelElementAction(elementId));
  }

  protected abstract initialize(projectId: string): void;
}
