import { Graphics } from '../graphics';
import { ObjectModelService, ViewModelService } from '../services/model-services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import {
  ElementPresentationModel,
  ClassPresentationModel,
  CommentPresentationModel
} from './presentation-model';
import {
  ObjectModel,
  ClassModel,
  CommentModel
} from '../data-model/object-model';
import {
  ViewModel,
  ClassView,
  CommentView
} from '../data-model/view-model';

export class DiagramController {
  private graphic: Graphics;
  private objectModelsIds: Array<string>;
  private viewModelsIds: Array<string>;
  private elements: Map<string, ElementPresentationModel>;
  private viewToModelId: Map<string, string>;

  constructor(
    private modelService: ObjectModelService,
    private viewService: ViewModelService
  ) {
    this.elements = new Map<string, ElementPresentationModel>();
    this.viewToModelId = new Map<string, string>();
    this.objectModelsIds = [];
    this.viewModelsIds = [];

    this.modelService.elementsIds$.subscribe(ids => {
      this.objectModelsIds = ids;
      this.createElements();
    });

    this.viewService.elementsIds$.subscribe(ids => {
      this.viewModelsIds = ids;
      this.createElements();
    });
  }

  public initialize(element: HTMLElement) {
    this.graphic = new Graphics(element, 800, 600);
    element.addEventListener('mousedown', () => {
      this.modelService.setSelectedModel(null);
      this.viewService.setSelectedView(null);
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
        });
      });
    }
  }

  private setUpdateEvents(model: ObjectModel, view: ViewModel) {
    this.modelService.getElementById(model.$key).subscribe(modelData => {
      this.elements.get(modelData.$key).updateModel(modelData);
    });
    this.viewService.getElementById(view.$key).subscribe(viewData => {
      this.elements.get(viewData.modelId).updateView(viewData);
    });
  }

  private chooseInstanation(model: ObjectModel, view: ViewModel) {
    switch (model.elementType) {
      // case 'Comment': {
      //   this.createCommentPresentation(model as CommentModel, view as CommentView);
      //   break;
      // }
      case 'Class': {
        this.createClassPresentation(model as ClassModel, view as ClassView);
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
  }

  private createInterfacePresentation() {}
}
