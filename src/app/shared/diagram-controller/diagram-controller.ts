import { Graphics } from '../graphics';
import { ObjectModelService, ViewModelService } from '../services/model-services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import {
  ElementPresentationModel,
  CommentPresentationModel
} from './presentation-model';
import {
  ObjectModel,
  CommentModel
} from '../data-model/object-model';
import {
  ViewModel,
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
          this.setUpdateEvents(model, view);
        });
      });
    }
  }

  private setUpdateEvents(model: ObjectModel, view: ViewModel) {
    const modelStream =  this.modelService.getElementById(model.$key);
    const viewStream = this.viewService.getElementById(view.$key);
    const updateStream = Observable.combineLatest(modelStream, viewStream);
    updateStream.subscribe(combined => {
      const modelData = combined[0];
      const viewData = combined[1];
      console.log('CombineLatest');
      this.elements.get(modelData.$key).update(modelData, viewData);
    });
  }

  private chooseInstanation(model: ObjectModel, view: ViewModel) {
    switch (model.elementType) {
      case 'Comment': {
        this.createCommentPresentation(model as CommentModel, view as CommentView);
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
      this.viewService.update(updatedView.$key, updatedView);
    });
  }

  private createClassPresentation() {
  }

  private createInterfacePresentation() {}
}
