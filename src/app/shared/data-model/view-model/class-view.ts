import { ViewModel } from './view.model';

export class ClassView extends ViewModel {
  x: number;
  y: number;
  width: number;
  height: number;
  nameCompartmentHeight: number;
  attributeCompartmentHeight: number;
  operationCompartmentHeight: number;
  attributes: Array<string>;
  operations: Array<string>;

  constructor(modelId: string, x: number, y: number) {
    super(modelId);
    this.x = x;
    this.y = y;
    this.width = 0;
    this.height = 0;
    this.nameCompartmentHeight = 0;
    this.attributeCompartmentHeight = 0;
    this.operationCompartmentHeight = 0;
    this.attributes = new Array<string>();
  }
}
