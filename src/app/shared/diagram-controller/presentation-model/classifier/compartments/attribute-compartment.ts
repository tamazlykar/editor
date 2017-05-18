import { Graphics, Rectangle, Text, TextAnchor, Element, FontStyle, TextDecoration } from '../../../../graphics';
import { ClassModel, InterfaceModel, PropertyModel } from '../../../../data-model/object-model';
import { ClassView, InterfaceView } from '../../../../data-model/view-model';
import { CompartmentSize } from './types';

export class AttributeCompartment {
  private static padding = {
    top: 5,
    left: 10,
    right: 10,
    bottom: 5,
    between: 5
  };
  private graphics: Graphics;
  private rect: Rectangle;
  private attributes: Array<Text>;
  private model: ClassModel | InterfaceModel;
  private view: ClassView | InterfaceView;

  constructor(graphics: Graphics) {
    this.graphics = graphics;
    this.attributes = new Array<Text>();
  }

  public build(model: ClassModel | InterfaceModel, view: ClassView | InterfaceView, heightOffset: number): CompartmentSize {
    this.model = model;
    this.view = view;

    const width = view.width;
    let height: number;

    // rect shold be created but can be inzisible with 0 0 sizes
    this.rect = this.graphics.rect(view.x, view.y + heightOffset, width, 0);

    if (!view.attributes) {
      return {
        width: 0,
        height: 0
      };
    }

    const visibleAttributes = this.getVisibleAttributes(model.attributes, view.attributes);
    const isLastCompartment = this.isLastCompartment(view);
    if (isLastCompartment) {
      height = view.height - heightOffset;
    } else {
      height = 0;
    }

    this.rect.width = width;
    this.rect.height = height;
    this.setModelAndViewIds(this.rect, model.$key, view.$key);
    // TODO style

    const n = visibleAttributes.length;
    let textBlockHeight = AttributeCompartment.padding.top;
    for (let i = 0; i < n; i++) {
      const text = this.graphics.text(view.x + AttributeCompartment.padding.left, view.y + heightOffset + textBlockHeight,
        PropertyModel.toString(visibleAttributes[i]));
      this.setData(text, model.$key, view.$key, visibleAttributes[i].id);
      this.setAttributeModel(text, visibleAttributes[i]);
      this.attributes.push(text);

      const bBox = text.getBBox();
      textBlockHeight += bBox.height + AttributeCompartment.padding.between;
    }
    textBlockHeight += AttributeCompartment.padding.bottom - AttributeCompartment.padding.between;

    // update rect height;
    if (!isLastCompartment) {
      this.rect.height = textBlockHeight;
    }

    return this.getCompartmentSize();
  }

  public updateModel(model: ClassModel | InterfaceModel): CompartmentSize {
    const oldModel = this.model;
    this.model = model;

    if (!this.view.attributes) {
      return {
        width: 0,
        height: 0
      };
    }

    if (oldModel.attributes.length !== model.attributes.length) {
      return this.getCompartmentSize(); // We should wait viewModel to add this item
    }
    // TODO may be can use JSON Stringify to understand that there is no changes

    const newAttributes = this.getVisibleAttributes(model.attributes, this.view.attributes);
    const oldAttribures = this.getVisibleAttributes(oldModel.attributes, this.view.attributes);

    for (let i = 0; i < newAttributes.length; i++) {
      this.updateAttributeModel(this.attributes[i], oldAttribures[i], newAttributes[i]);
    }

    return this.getCompartmentSize();
  }

  public updateView(view: ClassView | InterfaceView, heightOffset: number): CompartmentSize {
    const oldView = this.view;
    this.view = view;
    const isCompartmentAdded = this.isCompartmentAdded(oldView, view);
    const isCompartmentRemoved = this.isCompartmentRemoved(oldView, view);
    const isLastCompartment = this.isLastCompartment(view);


    if (view.x !== oldView.x) {
      const dx = view.x - oldView.x;
      this.rect.x += dx;
      for (const attr of this.attributes) {
        attr.x += dx;
      }
    }

    if (this.rect.y !== view.y + heightOffset) {
      const dy = view.y + heightOffset - this.rect.y;
      this.rect.y += dy;
      for (const attr of this.attributes) {
        attr.y += dy;
      }
    }

    if (isLastCompartment && view.attributes) {
      this.rect.height = view.height - heightOffset;
    }

    if (view.width !== oldView.width) {
      this.rect.width = view.width;
    }

    if (isCompartmentRemoved) { // last attr removed
      this.rect.height = 0;
      this.removeAttribute([]);
    }

    if (view.attributes && oldView.attributes && view.attributes.length < oldView.attributes.length) { // attr removed
      const existAttributes = this.getVisibleAttributes(this.model.attributes, view.attributes);
      this.removeAttribute(existAttributes);
    }

    if (!view.attributes) {
      return {
        width: 0,
        height: 0
      };
    }

    // TODO font support
    //
    // if (!oldView.attributes && view.attributes) { // first attr added
    //   this.he
    // }

    if ((view.attributes && oldView.attributes && view.attributes.length > oldView.attributes.length) ||
      (!oldView.attributes && view.attributes)) { // attr added
      const attrId = view.attributes[view.attributes.length - 1]; // new attr should be last
      let textBlockHeight = this.getTextBlockSize().height;
      if (textBlockHeight === 0) {
        textBlockHeight += AttributeCompartment.padding.top;
      } else {
        textBlockHeight -= AttributeCompartment.padding.bottom;
      }
      const x = view.x + AttributeCompartment.padding.left;
      const y = view.y + heightOffset + textBlockHeight - AttributeCompartment.padding.bottom + AttributeCompartment.padding.between;
      let model: PropertyModel;
      for (let i = 0; i < this.model.attributes.length; i++) {
        if (this.model.attributes[i].id === attrId) {
          model = this.model.attributes[i];
          break;
        }
      }
      const newAttr = this.addAttribute(x, y, model); // TODO data
      this.setData(newAttr, this.model.$key, this.view.$key, model.id);
      const bBox = newAttr.getBBox();

      if (!isLastCompartment) {
        this.rect.height = textBlockHeight + AttributeCompartment.padding.between + bBox.height;
      }
    }

    // TODO order of atributes

    return this.getCompartmentSize();
  }

  private updateAttributeModel(element: Text, oldModel: PropertyModel, newModel: PropertyModel) {
    if (PropertyModel.toString(oldModel) !== PropertyModel.toString(newModel)) {
      element.text = PropertyModel.toString(newModel);
    }

    if (newModel.isStatic !== oldModel.isStatic) {
      element.textDecoration = newModel.isStatic ? TextDecoration.underline : TextDecoration.none;
    }

    if (oldModel.id !== newModel.id) {
      this.setSubmodelId(element, newModel.id);
    }
  }

  private setAttributeModel(element: Text, model: PropertyModel) {
    element.text = PropertyModel.toString(model);
    element.textDecoration = model.isStatic ? TextDecoration.underline : TextDecoration.none;

    this.setSubmodelId(element, model.id);
  }

  private addAttribute(x: number, y: number, model: PropertyModel) {
    const newAttr = this.graphics.text(x, y, PropertyModel.toString(model));
    this.setAttributeModel(newAttr, model);
    this.attributes.push(newAttr);

    return newAttr;
  }

  private removeAttribute(existAttributes: Array<PropertyModel>) {
    /*
     1. get newAttributes;
     2. remove Last attr;
     3. change other to new
     */
    const deletedElement = this.attributes.pop();
    deletedElement.remove();

    if (existAttributes.length !== this.attributes.length) {
      throw Error('RemoveAttribute');
    }

    for (let i = 0; i < this.attributes.length; i++) {
      this.setAttributeModel(this.attributes[i], existAttributes[i]);
    }
  }

  public getGraphicElements(): Array<Element> {
    return [this.rect, ...this.attributes];
  }

  private getVisibleAttributes(attributeModels: Array<PropertyModel>, attributeViews: Array<string>): Array<PropertyModel> {
    const attributes = [];
    if (!attributeViews) {
      return attributes;
    }
    for (const id of attributeViews) {
      attributes.push(attributeModels.find((value: PropertyModel) => value.id === id));
    }
    return attributes;
  }

  private setData(element: Element, modelId: string, viewId: string, submodelId: string) {
    this.setModelAndViewIds(element, modelId, viewId);
    this.setSubmodelId(element, submodelId);
  }

  private setModelAndViewIds(element: Element, modelId: string, viewId: string) {
    element.data('modelId', modelId);
    element.data('viewId', viewId);
  }

  private setSubmodelId(element: Element, submodelId: string) {
    element.data('submodelId', submodelId);
  }

  private getTextBlockSize(): { width: number, height: number } {
    let height = 0;
    let width = 0;

    if (this.attributes.length === 0) {
      return {width, height};
    }

    height = AttributeCompartment.padding.top;

    for (let i = 0; i < this.attributes.length; i++) {
      const bBox = this.attributes[i].getBBox();
      height += bBox.height + AttributeCompartment.padding.between;
      if (width < bBox.width) {
        width = bBox.width;
      }
    }

    height += AttributeCompartment.padding.bottom - AttributeCompartment.padding.between;
    width = AttributeCompartment.padding.left + width + AttributeCompartment.padding.right;

    return {width, height};
  }

  private getCompartmentSize(): CompartmentSize {
    const rectBBox = this.rect.getBBox();
    const textBlockSize = this.getTextBlockSize();

    return {
      width: Math.max(textBlockSize.width, rectBBox.width),
      height: Math.max(textBlockSize.height, rectBBox.height)
    };
  }

  private isLastCompartment(view: ClassView | InterfaceView): boolean {
    return view.operations ? false : true;
  }

  private isCompartmentRemoved(oldView: ClassView | InterfaceView, newView: ClassView | InterfaceView) {
    return oldView.attributes && !newView.attributes ? true : false;
  }

  private isCompartmentAdded(oldView: ClassView | InterfaceView, newView: ClassView | InterfaceView) {
    return !oldView.attributes && newView.attributes ? true : false;
  }
}
