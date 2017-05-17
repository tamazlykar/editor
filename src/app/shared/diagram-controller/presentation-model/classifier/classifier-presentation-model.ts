import { ElementPresentationModel } from '../element-presentation-model';
import { Graphics, GraphicSet, UpdateInfo, ClickInfo } from '../../../graphics';
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

  constructor(graphics: Graphics, model: ClassModel | InterfaceModel, view: ClassView | InterfaceView) {
    super();
    this.updateSubject$ = new BehaviorSubject<ClassView | InterfaceView>(null);
    this.updateStream$ = this.updateSubject$.asObservable();
    this.view = view;
    this.graphics = graphics;
    this.build(graphics, model, view);
  }

  private build(graphics: Graphics, model: ClassModel | InterfaceModel, view: ClassView | InterfaceView) {
    const updatedView = Object.assign({}, view);

    // name compartment
    this.nameCompartment = new NameCompartment(graphics);
    const nameSizes = this.nameCompartment.build(model, updatedView);
    updatedView.nameCompartmentHeight = nameSizes.height;

    // attribute compartment
    this.attributeCompartment = new AttributeCompartment(graphics);
    const attrSizes = this.attributeCompartment.build(model, updatedView);
    updatedView.attributeCompartmentHeight = attrSizes.height;


    const maxWidth = Math.max(view.width, nameSizes.width, attrSizes.width);


    // if (view.width !== 0 && view.height !== 0) {
    //   return;
    // }

    //  update view if it was new view object
    const newView = Object.assign({}, view);
    newView.width = maxWidth;
    newView.nameCompartmentHeight = nameSizes.height;
    newView.attributeCompartmentHeight = attrSizes.height;
    newView.height = view.nameCompartmentHeight + view.attributeCompartmentHeight + view.operationCompartmentHeight;

    this.updateSubject$.next(newView);

    const graphicElements = [...this.nameCompartment.getGraphicElements(), ...this.attributeCompartment.getGraphicElements()];
    this.graphicSet = graphics.set();
    for (const el of graphicElements) {
      this.graphicSet.add(el);
    }
    this.graphicSet.draggable();
    this.graphicSet.resizable();

    this.subscribeToUpdates();
  }

  public update(model: ClassModel | InterfaceModel, view: ClassView | InterfaceView) {
    this.view = view;
    this.nameCompartment.update(model, view);
    this.attributeCompartment.update(model, view);
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
