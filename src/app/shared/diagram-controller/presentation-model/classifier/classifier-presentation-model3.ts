import { ElementPresentationModel } from '../element-presentation-model';
import { Graphics, GraphicSet, UpdateInfo, ClickInfo, Rectangle, Text } from '../../../graphics';
import {
  NameCompartment,
  AttributeCompartment,
  OperationCompartment
} from './compartments';
import { ClassModel, InterfaceModel } from '../../../data-model/object-model';
import { ClassView, InterfaceView } from '../../../data-model/view-model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


export abstract class ClassifierPresentationModel extends ElementPresentationModel {
  public updateStream$: Observable<ClassView | InterfaceView>;
  protected updateSubject$: BehaviorSubject<ClassView | InterfaceView>;
  protected nameCompartment: NameCompartment;
  protected attributeCompartment: AttributeCompartment;
  protected operationCompartment: OperationCompartment;
  protected graphics: Graphics;
  protected graphicSet: GraphicSet;
  protected view: ClassView | InterfaceView;
  protected model: ClassModel | InterfaceModel;

  constructor(graphics: Graphics, model: ClassModel | InterfaceModel, view: ClassView | InterfaceView) {
    super();
    this.updateSubject$ = new BehaviorSubject<ClassView | InterfaceView>(null);
    this.updateStream$ = this.updateSubject$.asObservable();
    this.view = view;
    this.model = model;
    this.graphics = graphics;
    this.create();
  }

  private create() {
    this.subscribeToUpdates();
  }

  protected abstract createNameCompartment();

  private createAttributeCompartment() {
    if (!this.view.attributes || this.view.attributes.length === 0) {
      return;
    }


  };

  private createOperationCompartment() {

  };

  public update(model: ClassModel | InterfaceModel, view: ClassView | InterfaceView) {

  }

  public updateView(view: ClassView | InterfaceView) {
    const updateInfo = this.getViewUpdateType(this.view, view);
  }

  public updateModel(model: ClassModel | InterfaceModel) {

  }

  private getViewUpdateType(oldView: ClassView | InterfaceView, newView: ClassView | InterfaceView) {
    if (this.isViewPositionOrSizeChanged(oldView, newView)) {

    }

    if (this.isViewAttributesAdded(oldView, newView)) {

    }

    if (this.isViewAttributesRemoved(oldView, newView)) {

    }
  }



  private isViewPositionOrSizeChanged(oldView: ClassView | InterfaceView, newView: ClassView | InterfaceView) {
    const o = oldView;
    const n = newView;

    if (o.x === n.x && o.y === n.y && o.width === n.width && o.height === n.height) {
      return false;
    }

    return true;
  }

  private checkModelName() {

  }

  private isViewAttributesAdded(oldView: ClassView | InterfaceView, newView: ClassView | InterfaceView) {
    if (!oldView.attributes && newView.attributes) {
      return true;
    }
    if (oldView.attributes.length < newView.attributes.length) {
      return true;
    }
    return false;
  }

  private isViewAttributesRemoved(oldView: ClassView | InterfaceView, newView: ClassView | InterfaceView) {
    if (oldView.attributes && !newView.attributes) {}
  }

  private checkModelAttributes() {

  }


  private subscribeToUpdates() {
    this.graphicSet.updates$.subscribe((updates: UpdateInfo) => {
      const newView = Object.assign({}, this.view);
      newView.x = updates.x;
      newView.y = updates.y;
      newView.width = updates.width;
      newView.height = updates.height;

      this.updateSubject$.next(newView);
    });

    this.graphicSet.clicks$.subscribe((clickInfo: ClickInfo) => {
      this.clickSubject$.next(clickInfo);
    });
  }
}


interface UpdateViewInfo {
  type: UpdateType;
  attribute?: any;
  operation?: any;
}

interface UpdateModelInfo {
  type: UpdateType;
  attribute?: any;
  operation?: any;
}


export const UpdateType = {
  positionOrSize: 'position-or-size' as UpdateType,
  nameUpdated: 'name-updated' as UpdateType,
  attributeUpdated: 'attribute-updated' as UpdateType,
  attributeAdded: 'attribute-added' as UpdateType,
  attributeRemoved: 'attribute-removed' as UpdateType,
  operationUpdated: 'operation-updated' as UpdateType,
  operationAdded: 'operation-added' as UpdateType,
  operationRemoved: 'operation-removed' as UpdateType
};

export type UpdateType
  = 'position-or-size'
  | 'name-updated'
  | 'attribute-updated'
  | 'attribute-added'
  | 'attribute-removed'
  | 'operation-updated'
  | 'operation-added'
  | 'operation-removed';
