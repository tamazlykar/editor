import { ElementPresentationModel } from '../element-presentation-model';
import { Graphics, GraphicSet, UpdateInfo, ClickInfo, Element } from '../../../graphics';
import {
  NameCompartment,
  AttributeCompartment,
  OperationCompartment
} from './compartments';
import { ClassModel, InterfaceModel } from '../../../data-model/object-model';
import { ClassView, InterfaceView } from '../../../data-model/view-model';
import { ElementType } from '../../../data-model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


export abstract class ClassifierPresentationModel extends ElementPresentationModel {
  public updateStream$: Observable<ClassView | InterfaceView>;
  protected updateSubject$: BehaviorSubject<ClassView | InterfaceView>;
  protected nameCompartment: NameCompartment;
  protected attributeCompartment: AttributeCompartment;
  protected operationCompartment: OperationCompartment;
  protected graphics: Graphics;
  protected view: ClassView | InterfaceView;

  constructor(graphics: Graphics, model: ClassModel | InterfaceModel, view: ClassView | InterfaceView) {
    super();
    this.updateSubject$ = new BehaviorSubject<ClassView | InterfaceView>(null);
    this.updateStream$ = this.updateSubject$.asObservable();
    this.view = view;
    this.graphics = graphics;
    this.build(model, view);
  }

  private build(model: ClassModel | InterfaceModel, view: ClassView | InterfaceView) {
    this.view = view;

    // name compartment
    this.nameCompartment = new NameCompartment(this.graphics, model.elementType as ElementType);
    const nameSizes = this.nameCompartment.build(model, view);

    // attribute compartment
    this.attributeCompartment = new AttributeCompartment(this.graphics);
    const attrSizes = this.attributeCompartment.build(model, view, nameSizes.height);

    this.operationCompartment = new OperationCompartment(this.graphics);
    const operSizes = this.operationCompartment.build(model, view, nameSizes.height + attrSizes.height);


    this.graphicSetInitialize();


    if (view.height === 0 && view.width === 0) {
      const maxWidth = Math.max(view.width, nameSizes.width, attrSizes.width, operSizes.width);
      // update view if it was new view object
      const newView = Object.assign({}, view);
      newView.width = maxWidth;
      newView.height = nameSizes.height + attrSizes.height + operSizes.height;

      this.updateSubject$.next(newView);
    }
  }

  public updateModel(model: ClassModel | InterfaceModel) {
    const nameSizes = this.nameCompartment.updateModel(model);
    const attrSizes = this.attributeCompartment.updateModel(model);
    const operSizes = this.operationCompartment.updateModel(model);

    const width = Math.max(nameSizes.width, attrSizes.width, operSizes.width);
    const height = nameSizes.height + attrSizes.height + operSizes.height;

    if (this.view.width < width || this.view.height < height) {
      const updateInfo: UpdateInfo = {
        x: this.view.x,
        y: this.view.y,
        width: Math.max(this.view.width, width),
        height: Math.max(this.view.height, height)
      };
      this.sendViewUpdate(updateInfo);
    }
  }

  public updateView(view: ClassView | InterfaceView) {
    this.view = view;

    const nameSizes = this.nameCompartment.updateView(view);
    const attrSizes = this.attributeCompartment.updateView(view, nameSizes.height);
    const operSizes = this.operationCompartment.updateView(view, nameSizes.height + attrSizes.height);

    const width = Math.max(nameSizes.width, attrSizes.width, operSizes.width);
    const height = nameSizes.height + attrSizes.height + operSizes.height;

    this.updateGraphicSetElements();

    if (this.view.width < width || this.view.height < height) {
      const updateInfo: UpdateInfo = {
        x: this.view.x,
        y: this.view.y,
        width: Math.max(this.view.width, width),
        height: Math.max(this.view.height, height)
      };
      this.sendViewUpdate(updateInfo);
    }
  }

  public remove() {
    const elements = this.getElementsFromCompartments();
    for (const el of elements) {
      el.remove();
    }
  }

  private sendViewUpdate(updates: UpdateInfo) {
    const newView = Object.assign({}, this.view);
    newView.x = updates.x;
    newView.y = updates.y;
    newView.width = updates.width;
    newView.height = updates.height;

    this.updateSubject$.next(newView);
  }

  private subscribeToUpdates() {
    this.graphicSet.updates$.subscribe((updates: UpdateInfo) => {
      this.sendViewUpdate(updates);
    });

    this.graphicSet.clicks$.subscribe((clickInfo: ClickInfo) => {
      this.clickSubject$.next(clickInfo);
    });
  }

  private graphicSetInitialize() {
    this.graphicSet = this.graphics.set();

    const elements = this.getElementsFromCompartments();

    for (const el of elements) {
        this.graphicSet.add(el);
    }

    this.graphicSet.draggable();
    this.graphicSet.resizable();

    this.subscribeToUpdates();
  }

  private updateGraphicSetElements() {
    const newSetElements = this.getElementsFromCompartments();

    if (this.graphicSet.length > newSetElements.length) {
      const removedItems = this.getDifference(newSetElements, this.graphicSet.getElements());
      for (const item of removedItems) {
        this.graphicSet.remove(item);
      }
    } else if (this.graphicSet.length < newSetElements.length) {
      const addedItems = this.getDifference(this.graphicSet.getElements(), newSetElements);
      for (const item of addedItems) {
        this.graphicSet.add(item);
      }
    }
  }

  private getElementsFromCompartments(): Array<Element> {
    const nameEl = this.nameCompartment.getGraphicElements();
    const attrEl = this.attributeCompartment.getGraphicElements();
    const operEl = this.operationCompartment.getGraphicElements();
    return [...nameEl, ...attrEl, ...operEl];
  }

  private getDifference(arr1: Array<any>, arr2: Array<any>) {
    return arr2.filter(val => arr1.indexOf(val) < 0);
  }
}
