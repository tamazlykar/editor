import { Graphics, Rectangle, Text, TextAnchor, Element, FontWeight, FontStyle } from '../../../../graphics';
import { ClassModel, InterfaceModel } from '../../../../data-model/object-model';
import { ClassView, InterfaceView } from '../../../../data-model/view-model';
import { CompartmentSize } from './types';

export class NameCompartment {
  private static padding = {
    top: 5,
    left: 10,
    right: 10,
    bottom: 5
  };
  private graphics: Graphics;
  private rect: Rectangle;
  private name: Text;
  private model: ClassModel | InterfaceModel;
  private view: ClassView | InterfaceView;


  constructor(graphics: Graphics) {
    this.graphics = graphics;
  }

  public build(model: ClassModel | InterfaceModel, view: ClassView | InterfaceView): CompartmentSize {
    this.model = model;
    this.view = view;

    let width = view.width;
    let height: number;
    const isLastCompartment = this.isLastCompartment(view);
    if (width === 0) {
      width = 1; // we need this because will be divide
    }

    // if attribute and operations not visible or not exst then height of this.compatment can be any
    if (isLastCompartment) {
      height = view.height;
    } else {
      height = 0;
    }

    // create border with 0 height
    this.rect = this.graphics.rect(view.x, view.y, width, height);

    // TODO style

    // create name
    this.name = this.graphics.text(view.x + width / 2, NameCompartment.padding.top + view.y, model.name);
    this.name.textAnchor = TextAnchor.middle;
    this.name.fontWeight = FontWeight.bold;
    this.name.fontStyle = model.isAbstract ? FontStyle.italic : FontStyle.normal;

    const bBox = this.name.getBBox();

    // update border coz now we know height
    if (!isLastCompartment) {
      height = NameCompartment.padding.top + bBox.height + NameCompartment.padding.bottom;
      this.rect.height = height;
    }

    this.setModelAndViewIds(this.rect, model.$key, view.$key);
    this.setModelAndViewIds(this.name, model.$key, view.$key);

    return this.getCompartmentSize();
  }

  // public update(model: ClassModel | InterfaceModel, view: ClassView | InterfaceView): CompartmentSize {
  //   console.log('ClassUpdate', view);
  //   this.rect.x = view.x;
  //   this.rect.y = view.y;
  //   this.rect.width = view.width;
  //   this.rect.height = view.height;
  //
  //   this.name.text = model.name;
  //   this.name.x = view.x + view.width / 2;
  //   this.name.y = view.y + this.padding.top;
  //
  //   const bBox = this.name.getBBox();
  //
  //   return {
  //     width: this.padding.left + bBox.width + this.padding.right,
  //     height: this.padding.top + bBox.height + this.padding.bottom
  //   };
  // }

  public updateModel(model: ClassModel | InterfaceModel): CompartmentSize {
    const oldModel = this.model;
    this.model = model;

    if (model.name !== oldModel.name) {
      this.name.text = model.name;
    }
    if (model.isAbstract !== oldModel.isAbstract) {
      this.name.fontStyle = model.isAbstract ? FontStyle.italic : FontStyle.normal;
    }

    return this.getCompartmentSize();
  }

  public updateView(view: ClassView | InterfaceView) {
    const isLastCompartment = this.isLastCompartment(view);
    const oldView = this.view;
    this.view = view;

    if (view.x !== oldView.x) {
      const dx = view.x - oldView.x;
      this.rect.x += dx;
      this.name.x += dx;
    }

    if (view.y !== oldView.y) {
      const dy = view.y - oldView.y;
      this.rect.y += dy;
      this.name.y += dy;
    }

    if (isLastCompartment) {
      this.rect.height = view.height; // TODO min and max sizes
    } else {
      this.rect.height = this.getTextBlockHeight();
    }

    if (view.width !== oldView.width) {
      this.rect.width = view.width;
      this.name.x = view.x + view.width / 2;
    }

    return this.getCompartmentSize();
  }

  public getGraphicElements(): Array<Element> {
    return [this.rect, this.name];
  }

  private setModelAndViewIds(element: Element, modelId: string, viewId: string) {
    element.data('modelId', modelId);
    element.data('viewId', viewId);
  }

  private getCompartmentSize(): CompartmentSize {
    const nameBBox = this.name.getBBox();
    const rectBBox = this.rect.getBBox();

    const nameWidth = NameCompartment.padding.left + nameBBox.width + NameCompartment.padding.right;
    const nameHeight = NameCompartment.padding.top + nameBBox.height + NameCompartment.padding.bottom;

    return {
      width: Math.max(nameWidth, rectBBox.width),
      height: Math.max(nameHeight, rectBBox.height)
    };
  }

  private isLastCompartment(view: ClassView | InterfaceView): boolean {
    return view.attributes || view.operations ? false : true;
  }

  private getTextBlockHeight() {
    const bBox = this.name.getBBox();
    return NameCompartment.padding.top + bBox.height + NameCompartment.padding.bottom;
  }
}
