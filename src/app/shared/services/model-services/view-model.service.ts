import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getViewModelIds, getViewElementId } from '../../redux/reducers';
import { getViewModelById } from '../../redux/selectors';
import * as app from '../../redux/actions/app';
import { ViewModelDataService } from '../data-services';

import { ViewModel } from '../../data-model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import 'rxjs/add/observable/interval';


@Injectable()
export class ViewModelService {
  public elementsIds$: Observable<string[]>;

  constructor(
    private store: Store<State>,
    private dataService: ViewModelDataService
  ) {
    this.elementsIds$ = this.store.select(getViewModelIds).debounce(() => Observable.interval(1000));
  }

  public add(element: ViewModel) {
    this.dataService.add(element);
  }

  public update(id: string, element: ViewModel) {
    this.dataService.update(id, element);
  }

  public remove(id: string) {
    this.dataService.remove(id);
  }

  public getElementById(id: string): Observable<ViewModel> {
    return this.store.let(getViewModelById(id));
  }

  public setSelectedView(id: string) {
    this.store.dispatch(new app.SetViewElementAction(id));
  }

  public getSelectedView(): Observable<ViewModel> {
    return this.store.select(getViewElementId).switchMap(id => this.getElementById(id));
  }
}
