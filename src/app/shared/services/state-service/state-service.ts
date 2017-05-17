import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getModelElementId, getViewElementId } from '../../redux/reducers';
import * as app from '../../redux/actions/app';
import { getObjectModelById, getViewModelById } from '../../redux/selectors';
import { ObjectModel, ViewModel } from '../../data-model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StateService {
  private selectedElementModel: ObjectModel;
  private selectedElementView: ViewModel;

  constructor(
    private store: Store<State>
  ) { // TODO
    this.store.select(getModelElementId).subscribe(id => {
      this.store.let(getObjectModelById(id)).subscribe((model: ObjectModel) => {
        this.selectedElementModel = model;
      });
    });
    this.store.select(getViewElementId).subscribe(id => {
      this.store.let(getViewModelById(id)).subscribe((view: ViewModel) => {
        this.selectedElementView = view;
      });
    });
  }

  getSelectedElementModel(): Observable<any> {
    return this.store.select(getModelElementId).map(id => this.store.let(getObjectModelById(id)));
  }

  getSelectedElementView(): Observable<any> {
    return this.store.select(getViewElementId).map(id => this.store.let(getViewModelById(id)));
  }

  setSelectedElement(modelId: string, viewId: string) {
    this.store.dispatch(new app.SetModelElementAction(modelId));
    this.store.dispatch(new app.SetViewElementAction(viewId));
  }
}
