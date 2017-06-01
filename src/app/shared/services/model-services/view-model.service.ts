import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getViewModelIds, getViewElementId } from '../../redux/reducers';
import { getViewModelById } from '../../redux/selectors';
import * as app from '../../redux/actions/app';
import { ViewModelDataService } from '../data-services';

import { ViewModel, ElementType } from '../../data-model';

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

  public addFeature(targetId: string, featureId: string, type: ElementType) {
    this.getElementById(targetId)
      .first()
      .subscribe((view: any) => {
        let newView: ViewModel;
        switch (type) {
          case ElementType.property: {
            let attributes;
            if (!view.attributes) {
              attributes = [featureId];
            } else {
              attributes = [...view.attributes, featureId];
            }
            newView = Object.assign({}, view, {attributes});
            break;
          }
          case  ElementType.operation: {
            let operations;
            if (!view.operations) {
              operations = [featureId];
            } else {
              operations = [...view.operations, featureId];
            }
            newView = Object.assign({}, view, {operations});
            break;
          }
        }

        this.update(newView.$key, newView);
      });
  }

  public update(id: string, element: ViewModel) {
    this.dataService.update(id, element);
  }

  public remove(id: string) {
    this.dataService.remove(id);
  }

  public removeFeature(targetId: string, featureId: string) {
    this.getElementById(targetId)
      .first()
      .subscribe((element: any) => {
        let newElement: ViewModel;
        if (element.attributes) {
          const i = element.attributes.findIndex((attr) => attr === featureId);
          if (i !== -1) {
            const attributes = [...element.attributes.slice(0, i), ...element.attributes.slice(i + 1)];
            newElement = Object.assign({}, element, {attributes});
          }
        }
        if (!newElement && element.operations) {
          const i = element.operations.findIndex((oper) => oper === featureId);
          if (i !== -1) {
            const operations = [...element.operations.slice(0, i), ...element.operations.slice(i + 1)];
            newElement = Object.assign({}, element, {operations});
          }
        }

        this.update(newElement.$key, newElement);
      });
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
