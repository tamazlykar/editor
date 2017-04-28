import { Observable } from 'rxjs/Observable';
import { Graphics, Element, Rectangle, Text } from '../graphics';
import { ClassModel } from '../shared/model/object-model';

export class Class {
  private objectModel: Observable<ClassModel>;
  private viewModel: Observable<ClassViewModel>;
  private g: Graphics;
  private presentation: PresentationModel;
  private data: {
    model: ClassObjectModel,
    view: ClassViewModel
  };

  constructor(
    objectModel: Observable<ClassModel>,
    viewModel: Observable<ClassViewModel>,
    graphics: Graphics
  ) {
    this.objectModel = objectModel;
    this.viewModel = viewModel;
    this.g = graphics;

    this.presentation = new PresentationModel();
    this.data = { model: null, view: null};
  }


  initialize() {
  }

  initializeNameCompartment() {
    const model = this.data.model;
    const view = this.data.view;

    const rect = this.g.rect(view.x, view.y, view.width, view.height);
    const text = this.g.text(view.x + view.width / 2, view.y + view.height / 2, model.name);

    this.presentation.nameCompartment.rectangle = rect;
    this.presentation.nameCompartment.name = text;
  }

  initializeArttributeCompartment() {
    const model = this.data.model;
    const view = this.data.view;

    // sort attributes in right order and get them from model
    const attributesCount = view.attributes.length;
    const sotredAttributes = Array<AttributeObjectModel>(attributesCount);

    for (const attr of view.attributes) {
      sotredAttributes[attr.pos] = model.attributes.find((value) => {
        return value.$key === attr.attributeKey;
      });
    }

    const rect = this.g.rect(view.x, view.y, view.width, view.height);
    let attributes = Array<Text>();

    for (const attr of sotredAttributes) {
      // get string from number of params
      const text = attr.name;
      attributes.push(this.g.text(10, 20, text));  // replace with normal numbers;
    }


    this.presentation.attributesCompartment.rectangle = rect;
    this.presentation.attributesCompartment.attributes = attributes;
  }
}



class ClassViewModel {
  x: number;
  y: number;
  width: number;
  height: number;

  attributes: Array<ViewAttribute>;
}

interface ViewAttribute {
  attributeKey: string;
  pos: number;
}
