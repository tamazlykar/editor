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
    this.create(graphics, model, view);
  }

  private create(graphics: Graphics, model: ClassModel | InterfaceModel, view: ClassView | InterfaceView) {
    this.graphicSet.draggable();
    this.graphicSet.resizable();

    this.subscribeToUpdates();
  }

  protected abstract createNameCompartment();

  private createAttributesCompartment

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
