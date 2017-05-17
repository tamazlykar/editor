import { ElementPresentationModel } from './element-presentation-model';
import { NameCompartment, AttributeCompartment, OperationCompartment } from './compartments';
import { Graphics } from '../../graphics';

export class ClassPresentationModel extends ElementPresentationModel {
  private nameCompartment: NameCompartment;
  private attributeCompartment: AttributeCompartment;
  private operationCompartment: OperationCompartment;

  constructor(graphics: Graphics, model: any, view: any) {
    super();
    this.nameCompartment = new NameCompartment(graphics, model, view);
    this.attributeCompartment = new AttributeCompartment(graphics, model, view);
    this.operationCompartment = new OperationCompartment(graphics, model, view);
  }

  public update(model: any, view: any) {
    this.nameCompartment.update(model, view);
    this.attributeCompartment.update(model, view);
    this.operationCompartment.update(model, view);
  }
}
