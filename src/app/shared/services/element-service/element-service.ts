import { Injectable } from '@angular/core';
import { ObjectModelService, ViewModelService } from '../model-services';
import { ElementNameService } from './element-name.service';
import {
  ElementType,
  ClassModel,
  InterfaceModel,
  PropertyModel,
  OperationModel,
  CommentModel
} from '../../data-model/object-model';
import {
  ClassView,
  InterfaceView,
  CommentView
} from '../../data-model/view-model';

@Injectable()
export class ElementService {

  constructor(
    private nameService: ElementNameService,
    private modelService: ObjectModelService,
    private viewService: ViewModelService
  ) { }

  public addClass(x: number, y: number) {
    this.nameService.getClassName()
      .first()
      .subscribe(name => {
        const model = new ClassModel(name);
        this.modelService.add(model)
          .then(id => {
            const view = new ClassView(id, x, y);
            this.viewService.add(view);
          });
      });
  }

  public addInterface(x: number, y: number) {
    this.nameService.getInterfaceName()
      .first()
      .subscribe(name => {
        const model = new InterfaceModel(name);
        this.modelService.add(model)
          .then(id => {
            const view = new InterfaceView(id, x, y);
            this.viewService.add(view);
          });
      });
  }

  public addAttribute(modelId: string, viewId: string) {
    this.nameService.getAttributeName(modelId)
      .first()
      .subscribe(name => {
        const model = new PropertyModel(name);
        this.modelService.addFeature(modelId, model);
        this.viewService.addFeature(viewId, model.id, ElementType.property);
      });
  }

  public addOperation(modelId: string, viewId: string) {
    this.nameService.getOperationName(modelId)
      .first()
      .subscribe(name => {
        const model = new OperationModel(name);
        this.modelService.addFeature(modelId, model);
        this.viewService.addFeature(viewId, model.id, ElementType.operation);
      });
  }

  public addComment(x: number, y: number) {
    const model = new CommentModel('Текст комментария');
    this.modelService.add(model)
      .then(id => {
        const view = new CommentView(id, x, y);
        this.viewService.add(view);
      });
  }

  public removeElementModel(modelId: string, viewId: string) {
    this.viewService.setSelectedView(null);
    this.modelService.setSelectedModel(null, null);
    this.viewService.remove(viewId);
    this.modelService.remove(modelId);
  }

  public removeElementView(viewId: string) {
    this.modelService.setSelectedModel(null, null);
    this.viewService.setSelectedView(null);
    this.viewService.remove(viewId);
  }

  public removeFeatureModel(classifierModelId: string, classifierViewId: string, featureId: string) {
    this.modelService.setSelectedModel(null, null);
    this.viewService.setSelectedView(null);
    this.viewService.removeFeature(classifierViewId, featureId);
    this.modelService.removeFeature(classifierModelId, featureId);
  }

  public removeFeatureView(viewId: string, featureId: string) {
    this.modelService.setSelectedModel(null, null);
    this.viewService.setSelectedView(null);
    this.viewService.removeFeature(viewId, featureId);
  }
}
