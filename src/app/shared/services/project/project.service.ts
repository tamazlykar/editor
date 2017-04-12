import { Store } from '@ngrx/store';
import { State, getUserId } from '../../reducers';
import * as app from '../../actions/app-state';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Project } from '../../interfaces';

export abstract class ProjectService {
  public projects: Observable<Project[]>;
  protected _projects: BehaviorSubject<Project[]>;
  protected dataStore: { projects: Project[] };
  protected url: string;
  protected userId: string;

  constructor(protected store: Store<State>) {
    this.store.select(getUserId)
      .subscribe((value: string) => {
        if (!value) {
          return;
        }

        this.userId = value;
        this.initialize();
      });
  }

  public abstract add(project: Project): void;
  public abstract update(key: string, project: Project): void;
  public abstract delete(key: string): void;
  public abstract load(): void;

  public set(projectId: string): void {
    this.store.dispatch(new app.SetProjectAction(projectId));
  }

  protected abstract initialize();
}


// implementing for Rest could be found here
// https://coryrylan.com/blog/angular-observable-data-services
