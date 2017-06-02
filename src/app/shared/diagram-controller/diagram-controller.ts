import { Injectable } from '@angular/core';
import { Graphics } from '../graphics';
import { ObjectModelService, ViewModelService } from '../services/model-services';
import { EventManagerService } from '../event-manager';
import { ContextMenuService } from '../context-menu';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import {
  ElementPresentationModel,
  ClassPresentationModel,
  CommentPresentationModel,
  InterfacePresentationModel
} from './presentation-model';
import {
  ObjectModel,
  ClassModel,
  CommentModel,
  InterfaceModel
} from '../data-model/object-model';
import {
  ViewModel,
  ClassView,
  CommentView,
  InterfaceView
} from '../data-model/view-model';


@Injectable()
export class DiagramControllerService {
  private graphic: Graphics;
  private objectModelsIds: Array<string>;
  private viewModelsIds: Array<string>;
  private elements: Map<string, ElementPresentationModel>;
  private viewToModelId: Map<string, string>;
  private selectedModel: any;
  private selectedView: any;

  constructor(
    private modelService: ObjectModelService,
    private viewService: ViewModelService,
    private eventManager: EventManagerService,
    private contextMenuService: ContextMenuService
  ) {
    this.elements = new Map<string, ElementPresentationModel>();
    this.viewToModelId = new Map<string, string>();
    this.objectModelsIds = [];
    this.viewModelsIds = [];

    const self = this;

    this.modelService.getElementIds().subscribe(ids => {
      if (ids.length < self.objectModelsIds.length) {
        this.removeDeletedModels(ids, self.objectModelsIds);
      }
      this.objectModelsIds = ids;
      this.createElements();
    });

    this.viewService.elementsIds$.subscribe(ids => {
      if (ids.length < self.viewModelsIds.length) {
        this.removeDeletedViews(ids, self.viewModelsIds);
      }
      this.viewModelsIds = ids;
      this.createElements();
    });

    this.viewService.getSelectedView().subscribe(view => this.selectedView = view);
    this.modelService.getSelectedModel().subscribe(model => this.selectedModel = model);
  }

  public initialize(element: HTMLElement) {
    this.graphic = new Graphics(element, element.clientWidth, element.clientHeight - 4);
    element.addEventListener('mousedown', () => {
      if (this.selectedView) {
        this.viewService.setSelectedView(null);
      }
      if (this.selectedModel) {
        this.modelService.setSelectedModel(null);
      }
    });

    element.addEventListener('mouseup', (e) => {
      this.eventManager.canvasAddNewElement(e);
    });
    this.createElements();
  }

  private createElements() {
    if (!this.graphic) {
      return;
    }
    if (this.viewModelsIds.length === 0 || this.objectModelsIds.length === 0) {
      return;
    }

    const uncreatedIds = this.getUncreatedIds();

    for (const id of uncreatedIds) {
      let model: ObjectModel;
      let view: ViewModel;

      this.viewService.getElementById(id).first().subscribe(viewData => {
        view = viewData;
        this.modelService.getElementById(view.modelId).first().subscribe(modelData => {
          model = modelData;

          this.viewToModelId.set(view.$key, model.$key);
          this.chooseInstanation(model, view);
          if (model.elementType === 'Class') { // TODO
            this.setUpdateEvents(model, view);
          }
          if (model.elementType === 'Interface') {
            this.setUpdateEvents(model, view);
          }
          if (model.elementType === 'Comment') {
            this.setUpdateEvents(model, view);
          }
        });
      });
    }
  }

  private setUpdateEvents(model: ObjectModel, view: ViewModel) {
    this.modelService.getElementById(model.$key)
      .takeWhile(data => !!data)
      .subscribe(modelData => {
      this.elements.get(modelData.$key).updateModel(modelData);
    });
    this.viewService.getElementById(view.$key)
      .takeWhile(data => !!data)
      .subscribe(viewData => {
      this.elements.get(viewData.modelId).updateView(viewData);
    });


  }

  private chooseInstanation(model: ObjectModel, view: ViewModel) {
    switch (model.elementType) {
      case 'Comment': {
        this.createCommentPresentation(model as CommentModel, view as CommentView);
        break;
      }
      case 'Class': {
        this.createClassPresentation(model as ClassModel, view as ClassView);
        break;
      }
      case 'Interface': {
        this.createInterfacePresentation(model as ClassModel, view as ClassView);
        break;
      }
    }
  }

  private getUncreatedIds(): Array<string> {
    let uncreatedIds = [];
    for (const id of this.viewModelsIds) {
      if (this.viewToModelId.has(id)) {
        continue;
      }
      uncreatedIds.push(id);
    }

    return uncreatedIds;
  }

  private createCommentPresentation(model: CommentModel, view: CommentView) {
    const presentationModel = new CommentPresentationModel(this.graphic, model, view);
    this.elements.set(model.$key, presentationModel);
    presentationModel.updateStream$.subscribe(updatedView => {
      if (updatedView) {
        this.viewService.update(updatedView.$key, updatedView);
      }
    });
    presentationModel.clickStream$.subscribe(clickInfo => {
      if (clickInfo) {
        this.modelService.setSelectedModel(clickInfo.modelId);
        this.viewService.setSelectedView(clickInfo.viewId);
      }
    });
  }

  private createClassPresentation(model: ClassModel, view: ClassView) {
    const presentationModel = new ClassPresentationModel(this.graphic, model, view);
    this.elements.set(model.$key, presentationModel);
    presentationModel.updateStream$.subscribe(updatedView => {
      if (updatedView) {
        this.viewService.update(updatedView.$key, updatedView);
      }
    });
    presentationModel.clickStream$.subscribe(clickInfo => {
      if (clickInfo) {
        this.modelService.setSelectedModel(clickInfo.modelId, clickInfo.submodelId);
        this.viewService.setSelectedView(clickInfo.viewId);
      }
    });

    this.setEventManagerEvent(presentationModel, model.$key, view.$key);

    presentationModel.addEventListener('contextmenu', this.contextMenuService.getClassifierCallback(model.$key, view.$key).bind(this.contextMenuService));
  }

  private createInterfacePresentation(model: InterfaceModel, view: InterfaceView) {
    const presentationModel = new InterfacePresentationModel(this.graphic, model, view);
    this.elements.set(model.$key, presentationModel);
    presentationModel.updateStream$.subscribe(updatedView => {
      if (updatedView) {
        this.viewService.update(updatedView.$key, updatedView);
      }
    });
    presentationModel.clickStream$.subscribe(clickInfo => {
      if (clickInfo) {
        this.modelService.setSelectedModel(clickInfo.modelId, clickInfo.submodelId);
        this.viewService.setSelectedView(clickInfo.viewId);
      }
    });

    this.setEventManagerEvent(presentationModel, model.$key, view.$key);

    presentationModel.addEventListener('contextmenu', this.contextMenuService.getClassifierCallback(model.$key, view.$key).bind(this.contextMenuService));
  }

  private setEventManagerEvent(element: ElementPresentationModel, modelId: string, viewId: string) {
    element.addEventListener('mouseup', (e) => {
      this.eventManager.elementAddNewSubelement(e as MouseEvent, modelId, viewId);
    })
  }

  private removeDeletedModels(newIds: Array<string>, oldIds: Array<string>) {
    const deletedIds = this.getDifference(newIds, oldIds);
    for (const id of deletedIds) {
      const element = this.elements.get(id);
      if (!element) {
        return;
      }
      element.remove();
      this.elements.delete(id);
    }
  }

  private removeDeletedViews(newIds: Array<string>, oldIds: Array<string>) {
    const deletedIds = this.getDifference(newIds, oldIds).map(value => this.viewToModelId.get(value));
    for (const id of deletedIds) {
      const element = this.elements.get(id);
      if (!element) {
        return;
      }
      element.remove();
      this.elements.delete(id);
    } // TODO remove also from view2model
  }

  private getDifference(arr1: Array<any>, arr2: Array<any>) { // elements from arr1 that not exist in arr2
    return arr2.filter(val => arr1.indexOf(val) < 0);
  }

  get graphics() {
    return this.graphic;
  }
}
