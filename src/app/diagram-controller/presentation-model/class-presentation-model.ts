import { Graphics, Element, Rectangle, Text, BoundingBox, FontFamily } from '../../graphics';
import { ClassModel, PropertyModel } from '../../shared/model/object-model';
import { ClassView } from '../../shared/model/view-model';

export class ClassPresentationModel {
  nameCompartment: NameCompartment;
  attributeCompartment: AttributeCompartment;
  operationCompatrment: OperationCompartment;
  g: Graphics;
  readonly nameSizeIncreasedBy = 2;

  constructor(graphics: Graphics, model: ClassModel, view: ClassView) {
    this.g = graphics;
    this.initialize(model, view);
  }

  private initialize(model: ClassModel, view: ClassView) {
    if (!view.width) {
      this.updateViewWidth(model, view);
    }

    this.createNameCompartment(model, view);

    this.attributeCompartment = new AttributeCompartment();
    this.operationCompatrment = new OperationCompartment();
  }

  private createNameCompartment(model: ClassModel, view: ClassView) {
    this.nameCompartment = new NameCompartment(this.g, model, view);
  }

  private createAttributeCompartment() {

  }

  private createOperationCompartment() {

  }

  private updateViewWidth(model: ClassModel, view: ClassView) {
    const width = this.getMaxWidth(model, view);
    view.width = width; // по хорошему надо это через get с отправкой в фб делать, но проблема в том что после этой
    // функции все встанет т.к. нельзя рисовать дальше пока не придут изменения. Возможно этот метод надо куда
    // то передвинуть.
  }

  private getMaxWidth(model: ClassModel, view: ClassView) {
    const nameWidth = this.getNameWidth(model, view);
    const attributesWidth = this.getAttributesWidth(model, view);
    const operationsWidth = this.getOperationWidth(model, view);

    return Math.max(nameWidth, attributesWidth, operationsWidth);
  }

  private getNameWidth(model: ClassModel, view: ClassView) {
    return this.getTextWidth(model.name, view.fontFamily, view.fontSize + this.nameSizeIncreasedBy);
  }

  private getAttributesWidth(model: ClassModel, view: ClassView) {
    if (view.attributes.length === 0) {
      return 0;
    }

    const visibleAttributes = model.attributes.filter((modelVal: PropertyModel) => {
      const index = view.attributes.findIndex((viewVal) => {
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

    return this.getTextWidth(longestAttribute.name, view.fontFamily, view.fontSize);
  }

  private getOperationWidth(model: ClassModel, view: ClassView) {
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

class NameCompartment {
  private static padding = {
    top: 10,
    left: 10,
    right: 10,
    bottom: 10
  };
  private rectangle: Rectangle;
  private name: Text;

  constructor(g: Graphics, model: ClassModel, view: ClassView) {
    this.rectangle = g.rect(view.x, view.y, width, height);
    this.name = g.text(view.x + view.width / 2, view.y + view.height / 2, model.name);
  }
}

class AttributeCompartment {
  rectangle: Rectangle;
  attributes: Array<Text>;

  constructor() {
    this.attributes = Array<Text>();
  }
}

class OperationCompartment {
  rectangle: Rectangle;
  operations: Array<Text>;

  constructor() {
    this.operations = Array<Text>();
  }
}
