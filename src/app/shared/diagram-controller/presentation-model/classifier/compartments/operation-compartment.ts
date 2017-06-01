import { Graphics, Rectangle, Text, TextAnchor, Element, FontStyle, TextDecoration } from '../../../../graphics';
import { ClassModel, InterfaceModel, OperationModel, ParameterModel } from '../../../../data-model/object-model';
import { ClassView, InterfaceView } from '../../../../data-model/view-model';
import { CompartmentSize } from './types';

export class OperationCompartment {
  private static padding = {
    top: 8,
    left: 10,
    right: 10,
    bottom: 5,
    between: 2
  };
  private graphics: Graphics;
  private rect: Rectangle;
  private operations: Array<Text>;
  private model: ClassModel | InterfaceModel;
  private view: ClassView | InterfaceView;

  private fontSize = 14;

  constructor(graphics: Graphics) {
    this.graphics = graphics;
    this.operations = new Array<Text>();
  }

  public build(model: ClassModel | InterfaceModel, view: ClassView | InterfaceView, heightOffset: number): CompartmentSize {
    this.model = model;
    this.view = view;

    const width = view.width;
    let height = 0;

    // rect should be initialized anyway with 0 height
    this.rect = this.graphics.rect(view.x, view.y + heightOffset, width, height);

    if (!view.operations) {
      return {
        width: 0,
        height: 0
      };
    }

    const visibleOperations = this.getVisibleOperations(model.operations, view.operations);
    let textBlockHeight = OperationCompartment.padding.top;
    for (let i = 0; i < visibleOperations.length; i++) {
      const text = this.graphics.text(view.x + OperationCompartment.padding.left, view.y + heightOffset + textBlockHeight,
        OperationModel.toString(visibleOperations[i]));
      text.fontSize = this.fontSize;
      this.setData(text, model.$key, view.$key, visibleOperations[i].id);
      this.setOperationModel(text, visibleOperations[i]);
      this.operations.push(text);

      const bBox = text.getBBox();
      textBlockHeight += bBox.height + OperationCompartment.padding.between;
    }
    textBlockHeight += OperationCompartment.padding.bottom - OperationCompartment.padding.between;
    height = view.height - heightOffset;

    this.rect.height = Math.max(textBlockHeight, height);
    this.setModelAndViewIds(this.rect, model.$key, view.$key);

    return this.getCompartmentSize();
  }

  public updateModel(model: ClassModel | InterfaceModel): CompartmentSize {
    const oldModel = this.model;
    this.model = model;

    if (!this.view.operations) {
      return {width: 0, height: 0};
    }

    if (oldModel.operations.length !== model.operations.length) {
      return this.getCompartmentSize();
    }

    const newOperations = this.getVisibleOperations(model.operations, this.view.operations);
    const oldOperations = this.getVisibleOperations(oldModel.operations, this.view.operations);

    for (let i = 0; i < newOperations.length; i++) {
      this.updateOperationModel(this.operations[i], oldOperations[i], newOperations[i]);
    }

    return this.getCompartmentSize();
  }

  public updateView(view: ClassView | InterfaceView,  heightOffset: number): CompartmentSize {
    const oldView = this.view;
    this.view = view;

    const isCompartmentAdded = this.isCompartmentAdded(oldView, view);
    const isCompartmentRemoved = this.isCompartmentRemoved(oldView, view);
    const isCompartmentVisible = this.view.operations ? true : false;

    if (view.x !== oldView.x) {
      const dx = view.x - oldView.x;
      this.rect.x += dx;
      for (const oper of this.operations) {
        oper.x += dx;
      }
    }

    if (this.rect.y !== view.y + heightOffset) {
      const dy = view.y + heightOffset - this.rect.y;
      this.rect.y += dy;
      for (const oper of this.operations) {
        oper.y += dy;
      }
    }

    if (view.width !== oldView.width) {
      this.rect.width = view.width;
    }

    if (view.height !== oldView.height && isCompartmentVisible) { // check to max
      this.rect.height = view.height - heightOffset;
    }

    const addOperation = () => {
      const operId = view.operations[view.operations.length - 1];
      let textBlockHeight = this.getTextBlockSize().height;
      if (textBlockHeight === 0) {
        textBlockHeight += OperationCompartment.padding.top;
      } else {
        textBlockHeight -= OperationCompartment.padding.bottom;
      }
      const x = view.x + OperationCompartment.padding.left;
      const y = view.y + heightOffset + textBlockHeight + OperationCompartment.padding.between;
      let model: OperationModel;
      for (let i = 0; i < this.model.operations.length; i++) {
        if (this.model.operations[i].id === operId) {
          model = this.model.operations[i];
          break;
        }
      }

      // TODO can be a function
      const newOper = this.graphics.text(x, y, OperationModel.toString(model));
      newOper.fontSize = this.fontSize;
      this.setData(newOper, this.model.$key, this.view.$key, model.id);
      this.setOperationModel(newOper, model);
      this.operations.push(newOper);

      textBlockHeight += newOper.getBBox().height + OperationCompartment.padding.between + OperationCompartment.padding.bottom;

      this.rect.height = Math.max(textBlockHeight, view.height - heightOffset);
    }
    const removeOperation =() => {
      const visibleOperations = this.getVisibleOperations(this.model.operations, view.operations);

      const deletedElement = this.operations.pop();
      deletedElement.remove();

      if (visibleOperations.length !== this.operations.length) {
        throw Error('ErrorRemoveOperation');
      }

      for (let i = 0; i < visibleOperations.length; i++) {
        this.setOperationModel(this.operations[i], visibleOperations[i]);
      }

      if (isCompartmentRemoved) {
        this.rect.height = 0;
      }
    }

    if (isCompartmentAdded) {
      addOperation();
    } else if (isCompartmentRemoved) {
      removeOperation();
    }

    if (view.operations && oldView.operations) {
      if (view.operations.length > oldView.operations.length) {
        addOperation();
      }
      else if (view.operations.length < oldView.operations.length) {
        removeOperation();
      }
    }

    return this.getCompartmentSize();
  }

  public getGraphicElements(): Array<Element> {
    return [this.rect, ...this.operations];
  }

  private getVisibleOperations(operationModels: Array<OperationModel>, operationViews: Array<string>): Array<OperationModel> {
    const operations = [];
    if (!operationViews) {
      return operations;
    }
    for (const id of operationViews) {
      operations.push(operationModels.find(val => val.id === id));
    }
    return operations;
  }

  private getCompartmentSize() {
    const rectBBox = this.rect.getBBox();
    const textBlockSize = this.getTextBlockSize();

    return {
      width: Math.max(textBlockSize.width, rectBBox.width),
      height: Math.max(textBlockSize.height, rectBBox.height)
    };
  }

  private getTextBlockSize(): { width: number, height: number } {
    let height = 0;
    let width = 0;

    if (this.operations.length === 0) {
      return {width, height};
    }

    height = OperationCompartment.padding.top;

    for (let i = 0; i < this.operations.length; i++) {
      const bBox = this.operations[i].getBBox();
      height += bBox.height + OperationCompartment.padding.between;
      if (width < bBox.width) {
        width = bBox.width;
      }
    }

    height += OperationCompartment.padding.bottom - OperationCompartment.padding.between;
    width = OperationCompartment.padding.left + width + OperationCompartment.padding.right;

    return {width, height};
  }

  private setOperationModel(element: Text, model: OperationModel) {
    element.text = OperationModel.toString(model);

    element.textDecoration = model.isStatic ? TextDecoration.underline : TextDecoration.none;
    element.fontStyle = model.isAbstract ? FontStyle.italic : FontStyle.normal;

    this.setSubmodelId(element, model.id);
  }

  private updateOperationModel(element: Text, oldModel: OperationModel, newModel: OperationModel) {
    if (OperationModel.toString(oldModel) !== OperationModel.toString(newModel)) {
      element.text = OperationModel.toString(newModel);
    }

    if (newModel.isStatic !== oldModel.isStatic) {
      element.textDecoration = newModel.isStatic ? TextDecoration.underline : TextDecoration.none;
    }

    if (newModel.isAbstract !== oldModel.isAbstract) {
      element.fontStyle = newModel.isAbstract ? FontStyle.italic : FontStyle.normal;
    }

    if (oldModel.id !== newModel.id) {
      this.setSubmodelId(element, newModel.id);
    }
  }

  private isCompartmentAdded(oldView: ClassView | InterfaceView, newView: ClassView | InterfaceView) {
    return !oldView.operations && newView.operations ? true : false;
  }

  private isCompartmentRemoved(oldView: ClassView | InterfaceView, newView: ClassView | InterfaceView) {
    return oldView.operations && !newView.operations ? true : false;
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
}
