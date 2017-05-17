import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getObjectModelIds, getModelElementId } from '../../redux/reducers';
import { getObjectModelById } from '../../redux/selectors';
import * as app from '../../redux/actions/app';
import { ObjectModelDataService } from '../data-services';

import { ObjectModel } from '../../data-model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/observable/interval';


@Injectable()
export class ObjectModelService {
  public elementsIds$: Observable<string[]>;

  constructor(
    private store: Store<State>,
    private dataService: ObjectModelDataService
  ) {
    this.elementsIds$ = this.store.select(getObjectModelIds).debounce(() => Observable.interval(1000));
  }

  public add(element: ObjectModel): Promise<string> {
    return new Promise((resolve) => {
      this.dataService.add(element)
        .then(key => resolve(key));
    });
  }

  public update(id: string, element: ObjectModel) {
    this.dataService.update(id, element);
  }

  public remove(id: string) {
    this.dataService.remove(id);
  }

  public getElementById(id: string): Observable<ObjectModel> {
    return this.store.let(getObjectModelById(id));
  }

  public setSelectedModel(id: string) {
    this.store.dispatch(new app.SetModelElementAction(id));
  }

  public getSelectedModel(): Observable<ObjectModel> {
    return this.store.select(getModelElementId).switchMap(id => this.getElementById(id));
  }
}
