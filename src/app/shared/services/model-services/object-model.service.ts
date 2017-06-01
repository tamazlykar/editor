import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getObjectModelIds, getModelElementId, getSubmodelElementId, getObjectModels } from '../../redux/reducers';
import { getObjectModelById } from '../../redux/selectors';
import * as app from '../../redux/actions/app';
import { ObjectModelDataService } from '../data-services';

import { ObjectModel, ElementType } from '../../data-model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/first';


@Injectable()
export class ObjectModelService {
  private elementsIds$: Observable<string[]>;

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

  public addFeature(targetId: string, feature: ObjectModel) {
    this.getElementById(targetId)
      .first()
      .subscribe((model: any) => {
        let newModel: ObjectModel;
        switch (feature.elementType) {
          case ElementType.property: {
            let attributes;
            if (!model.attributes) {
              attributes = [feature];
            } else {
              attributes = [...model.attributes, feature];
            }
            newModel = Object.assign({}, model, {attributes})
            break;
          }
          case ElementType.operation: {
            let operations;
            if (!model.operations) {
              operations = [feature];
            } else {
              operations = [...model.operations, feature];
            }
            newModel = Object.assign({}, model, {operations})
            break;
          }
        }

        this.update(newModel.$key, newModel);
      });
  }

  public update(id: string, element: ObjectModel) {
    if (id) {
      this.dataService.update(id, element);
      return;
    }
    const el: any = element;
    if (!el.id) {
      return;
    }
    this.store.select(getModelElementId)
      .first().subscribe(modelId => {
        this.store.select(getSubmodelElementId)
          .first().subscribe(submodelId => {
            if (!submodelId || submodelId !== el.id) {
              return;
            }
            this.getElementById(modelId)
              .first().subscribe((model: any) => {
                if (model.attributes) {
                  for (let i = 0 ; i < model.attributes.length; i++) {
                    if (model.attributes[i].id === submodelId) {
                      const newArray = this.getChangeElementOnPosotion(model.attributes, element, i);
                      let newModel = Object.assign({}, model, {attributes: newArray});
                      this.update(newModel.$key, newModel);
                      return;
                    }
                  }
                }
                if (model.operations) {
                  for (let i = 0 ; i < model.operations.length; i++) {
                    if (model.operations[i].id === submodelId) {
                      const newArray = this.getChangeElementOnPosotion(model.operations, element, i);
                      let newModel = Object.assign({}, model, {operations: newArray});
                      this.update(newModel.$key, newModel);
                      return;
                    }
                  }
                }
              });
          });
      });
  }

  public remove(id: string) {
    this.dataService.remove(id);
  }

  public removeFeature(targetId: string, featureId: string) {
    this.getElementById(targetId)
      .first()
      .subscribe((element: any) => {
        let newElement: ObjectModel;
        if (element.attributes) {
          const i = element.attributes.findIndex((attr) => attr.id === featureId);
          if (i !== -1) {
            const attributes = [...element.attributes.slice(0, i), ...element.attributes.slice(i + 1)];
            newElement = Object.assign({}, element, {attributes});
          }
        }
        if (!newElement && element.operations) {
          const i = element.operations.findIndex((oper) => oper.id === featureId);
          if (i !== -1) {
            const operations = [...element.operations.slice(0, i), ...element.operations.slice(i + 1)];
            newElement = Object.assign({}, element, {operations});
          }
        }

        this.update(newElement.$key, newElement);
      });
  }

  public getElementById(id: string): Observable<ObjectModel> {
    return this.store.let(getObjectModelById(id));
  }

  public setSelectedModel(modelId: string, submodelId = null) {
    this.store.dispatch(new app.SetModelElementAction({modelId, submodelId}));
  }

  public getSelectedModel(): Observable<ObjectModel> {
    return this.store.select(getModelElementId).switchMap(id => {
      return this.store.select(getSubmodelElementId)
        .switchMap(submodelId => {
          if (submodelId) {
            return this.getElementById(id).map((value: any) => {
              let submodel: any;
              if (value.attributes) {
                for (let i = 0 ; i < value.attributes.length; i++) {
                  if (submodelId === value.attributes[i].id) {
                    submodel = value.attributes[i];
                    break;
                  }
                }
              }
              if (value.operations) {
                for (let i = 0 ; i < value.operations.length; i++) {
                  if (submodelId === value.operations[i].id) {
                    submodel = value.operations[i];
                    break;
                  }
                }
              }
              return submodel;
            });
          }
          return this.getElementById(id);
        });
    });
  }

  public getElements(): Observable<Array<ObjectModel>> {
    return this.store.select(getObjectModels)
      .map(modelsObject => {
        const keys = Object.keys(modelsObject);
        let arr = [];
        for (const k of keys) {
          arr.push(modelsObject[k]);
        }

        return arr;
      });
  }

  public getElementIds(): Observable<string[]> {
    return this.elementsIds$;
  }

  private getChangeElementOnPosotion(array: Array<any>, element: any, pos: number) {
    return [
      ...array.slice(0, pos),
      element,
      ...array.slice(pos + 1)
    ]
  }
}
