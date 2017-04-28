import { Graphics, GraphicSet } from '../graphics';
import { Element, Class } from '../model/presentation-model';

export class DiagramController {
  private g: Graphics;
  private elements: {[id: string]: GraphicSet};

  constructor(elements: Array<Element>) {
    const htmlElement = document.getElementById('canvas');
    this.g = new Graphics(htmlElement, 800, 600);

    for (const element of elements) {
      this.draw(element);
    }
  }

  private draw(element: Element) {
    switch (element.type) {
      case 'Class':
        this.drawClass(element as Class);
        break;
      case 'DependencyModel':
        this.drawDependency();
        break;
      case 'Association':
        this.drawAssociation();
        break;
      default:
        console.log('Error: DiagramController module. ElementModel unknown type');
        break;
    }
  }

  private drawClass(el: Class) {
    const nameCompartment = this.g.rect(el.x, el.y, el.width, el.height);
    const name = this.g.text(el.x + el.width / 2, el.y + el.height / 2, 'ClassName');

    const classSet = this.g.set();
    classSet.add(nameCompartment);
    classSet.add(name);
    classSet.draggable();
    classSet.updated$.subscribe(val => console.log('Moving'));

    // store.dispath({type: 'Update View ClassModel', payload: {x: newx, y: newy}}
  }

  private drawDependency() {

  }

  private drawAssociation() {

  }
}

interface DiagramControllerElement {
  id: string;
  set: GraphicSet;
}
