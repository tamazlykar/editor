import { ElementView } from '../element';
import { FontFamily } from '../../../../graphics';
import { ClassModel, PropertyModel } from '../../object-model';
import * as init from '../../../../initial-settings';
import { PropertyView } from '../features/property';

export class ClassView extends ElementView {
  public model: ClassModel;
  public x: number;
  public y: number;
  public width: number;
  public nameCompartmentHeight: number;
  public attributeCompartmentHeight: number;
  public operationCompartmentHeight: number;
  public fontFamily: FontFamily;
  public fontSize: number;
  public attributes: Array<PropertyView>;


  constructor(model: ClassModel) {
    super();
    this.x = 10;
    this.y = 10;
    this.width = null;
    this.nameCompartmentHeight = null;
    this.attributeCompartmentHeight = null;
    this.operationCompartmentHeight = null;
    this.fontFamily = init.fontFamily;
    this.fontSize = init.fontSize;
    this.attributes = Array<PropertyView>();

    this.model = model;
  }

  private updateViewWidth() {
    const width = this.getMaxWidth();
    view.width = width; // по хорошему надо это через get с отправкой в фб делать, но проблема в том что после этой
    // функции все встанет т.к. нельзя рисовать дальше пока не придут изменения. Возможно этот метод надо куда
    // то передвинуть.
  }

  private getMaxWidth() {
    const nameWidth = this.getNameWidth();
    const attributesWidth = this.getAttributesWidth();
    const operationsWidth = this.getOperationWidth();

    return Math.max(nameWidth, attributesWidth, operationsWidth);
  }

  private getNameWidth() {
    const nameSizeIncreasedBy = 2; // TODO
    return this.getTextWidth(this.model.name, this.fontFamily, this.fontSize + nameSizeIncreasedBy);
  }

  private getAttributesWidth() {
    if (this.attributes.length === 0) {
      return 0;
    }

    const visibleAttributes = this.model.attributes.filter((modelVal: PropertyModel) => {
      const index = this.attributes.findIndex((viewVal) => {
        return modelVal.$key = viewVal.propertyKey;
      });

      if (index === -1) {
        return false;
      }
      return true;
    });

    let longestAttribute: PropertyModel;
    let count = 0;
    for (const attr of visibleAttributes) {
      const length = attr.getTextRepresentation().length;
      if (length > count) {
        count = length;
        longestAttribute = attr;
      }
    }

    return this.getTextWidth(longestAttribute.name, this.fontFamily, this.fontSize);
  }

  private getOperationWidth() {
    // TODO:

    return 0;
  }


  private getTextWidth(text: string, fontFamily: FontFamily, fontSize: number): number {
    const textElement = this.g.text(0, 0, text);
    textElement.fontFamily = fontFamily;
    textElement.fontSize = fontSize;
    const bbox = textElement.getBBox();
    textElement.remove();
    return bbox.width;
  }
}
