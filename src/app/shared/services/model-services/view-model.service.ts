import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getViewModelIds } from '../../redux/reducers';
import { getViewModelById } from '../../redux/selectors';
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
    this.store.let(getViewModelById(id)).subscribe(a => console.log('sbs:', a));
    return this.store.let(getViewModelById(id));
  }
}
