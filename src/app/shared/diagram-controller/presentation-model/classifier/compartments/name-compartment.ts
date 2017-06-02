import { Graphics, Rectangle, Text, TextAnchor, Element, FontWeight, FontStyle } from '../../../../graphics';
import { ClassModel, InterfaceModel, ElementType } from '../../../../data-model/object-model';
import { ClassView, InterfaceView } from '../../../../data-model/view-model';
import { CompartmentSize } from './types';

export class NameCompartment {
  private static padding = {
    top: 10, // TODO: fix it to 5 and try to get equal top and bottom paddings
    left: 10,
    right: 10,
    bottom: 5,
    between: 2
  };
  private type: ElementType;
  private graphics: Graphics;
  private rect: Rectangle;
  private name: Text;
  private interfaceText: Text;
  private model: ClassModel | InterfaceModel;
  private view: ClassView | InterfaceView;

  private fontSize = 16;


  constructor(graphics: Graphics, type: ElementType) {
    this.graphics = graphics;
    this.type = type;
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

    let interfaceHeight = 0;
    let interfaceWidth = 0;
    // create interface
    if (this.type === ElementType.interface) {
      this.interfaceText = this.graphics.text(view.x + width / 2, NameCompartment.padding.top + view.y, '«interface»');
      this.interfaceText.fontSize = this.fontSize;
      this.interfaceText.textAnchor = TextAnchor.middle;

      this.setModelAndViewIds(this.interfaceText, model.$key, view.$key);

      const bBox = this.interfaceText.getBBox();
      interfaceHeight = bBox.height + NameCompartment.padding.between;
      interfaceWidth = bBox.width;
    }
    // create name
    this.name = this.graphics.text(view.x + width / 2, NameCompartment.padding.top + view.y + interfaceHeight, model.name);
    this.name.fontSize = this.fontSize;
    this.name.textAnchor = TextAnchor.middle;
    this.name.fontWeight = FontWeight.bold;
    this.name.fontStyle = model.isAbstract ? FontStyle.italic : FontStyle.normal;



    const bBox = this.name.getBBox();

    // update border coz now we know height
    if (!isLastCompartment) {
      height = NameCompartment.padding.top + interfaceHeight + bBox.height + NameCompartment.padding.bottom;
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
      if (this.type === ElementType.interface) {
        this.interfaceText.x += dx;
      }
    }

    if (view.y !== oldView.y) {
      const dy = view.y - oldView.y;
      this.rect.y += dy;
      this.name.y += dy;
      if (this.type === ElementType.interface) {
        this.interfaceText.y += dy;
      }
    }

    if (isLastCompartment) {
      this.rect.height = view.height; // TODO min and max sizes
    } else {
      this.rect.height = this.getTextBlockHeight();
    }

    if (view.width !== oldView.width) {
      this.rect.width = view.width;
      this.name.x = view.x + view.width / 2;
      if (this.type === ElementType.interface) {
        this.interfaceText.x = view.x + view.width / 2;
      }
    }

    return this.getCompartmentSize();
  }

  public getGraphicElements(): Array<Element> {
    if (this.type === ElementType.interface) {
      return [this.rect, this.name, this.interfaceText];
    } else {
      return [this.rect, this.name];
    }

  }

  private setModelAndViewIds(element: Element, modelId: string, viewId: string) {
    element.data('modelId', modelId);
    element.data('viewId', viewId);
  }

  private getCompartmentSize(): CompartmentSize {
    const nameBBox = this.name.getBBox();
    const rectBBox = this.rect.getBBox();
    let interfaceBBox = {width: 0, height: 0};
    if (this.type === ElementType.interface) {
      interfaceBBox = Object.assign({}, this.interfaceText.getBBox());
      interfaceBBox.height += NameCompartment.padding.between;
    }

    const nameWidth = NameCompartment.padding.left + nameBBox.width + NameCompartment.padding.right;
    const nameHeight = NameCompartment.padding.top + nameBBox.height + interfaceBBox.height + NameCompartment.padding.bottom;
    const interfaceWidth = NameCompartment.padding.left + interfaceBBox.width + NameCompartment.padding.right;

    return {
      width: Math.max(nameWidth, rectBBox.width, interfaceWidth),
      height: Math.max(nameHeight, rectBBox.height)
    };
  }

  private isLastCompartment(view: ClassView | InterfaceView): boolean {
    return view.attributes || view.operations ? false : true;
  }

  private getTextBlockHeight() {
    const bBox = this.name.getBBox();
    let interfaceBBox = {width: 0, height: 0};
    if (this.type === ElementType.interface) {
      interfaceBBox = Object.assign({}, this.interfaceText.getBBox());
      interfaceBBox.height += NameCompartment.padding.between;
    }
    return NameCompartment.padding.top + interfaceBBox.height + bBox.height + NameCompartment.padding.bottom;
  }
}
