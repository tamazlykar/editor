import {Element, Text} from './elements';
import {RaphaelText} from './raphael/raphael-text';

export abstract class GraphicSet {
  protected elements: Array<Element>;

  public add(element: Element): void {
    this.elements.push(element);
  }

  public remove(element: Element): void {
    const index = this.elements.indexOf(element);

    if (index === -1) {
      return
    }

    this.elements.splice(index, 1);
  }

  public abstract draggable(isDraggable: boolean): void;
}

