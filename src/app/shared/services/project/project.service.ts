import { Store } from '@ngrx/store';
import { State, getUserId } from '../../reducers';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Project } from '../../interfaces';

export abstract class ProjectService {
  public projects: Observable<Project[]>;
  public currentProject: Observable<Project>;
  protected _projects: BehaviorSubject<Project[]>;
  protected _currentProject: BehaviorSubject<Project>;
  protected dataStore: {
    projects: Project[],
    currentProject: Project;
   };
  protected url: string;
  protected userId: string;

  constructor(protected store: Store<State>) {
    this.store.select(getUserId)
      .subscribe((userId: string) => {
        if (!userId) {
          return;
        }
        this.userId = userId;
        this.initialize();
      });
  }

  public abstract add(project: Project): void;
  public abstract update(key: string, project: Project): void;
  public abstract delete(key: string): void;
  public abstract set(projectId: string): void;
  public abstract load(): void;

  protected abstract initialize(): void;
}


// implementing for Rest could be found here
// https://coryrylan.com/blog/angular-observable-data-services
