import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getProjectListState, getProjectId } from '../../redux/reducers';
import { SetProjectAction } from '../../redux/actions/app';
import { ProjectDataService } from '../data-services';

import { ProjectModel } from '../../data-model';

import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectService {
  public projects$: Observable<ProjectModel[]>;
  public currentProject$: Observable<ProjectModel>;
  private currentProjectId$: Observable<string>;

  constructor(
    private store: Store<State>,
    private dataService: ProjectDataService
  ) {
    this.projects$ = this.store.select(getProjectListState);
    this.currentProjectId$ = this.store.select(getProjectId);

    this.currentProject$ = this.currentProjectId$
      .combineLatest(this.projects$, (id, projects) => {
        if (!id) {
          return;
        }
        return projects.find(val => id === val.$key);
      }).distinctUntilChanged();
  }

  public add(project: ProjectModel) {
    this.dataService.add(project);
  }

  public update(id: string, project: ProjectModel) {
    this.dataService.update(id, project);
  }

  public remove(id: string) {
    this.dataService.remove(id);
  }

  public setCurrent(id: string) {
    this.store.dispatch(new SetProjectAction(id));
  }
}
