import {Element, Text} from './elements';
import {RaphaelText} from './raphael/raphael-text';
import { Subject } from 'rxjs/Subject';

export abstract class GraphicSet {
  protected elements: Array<Element>;
  protected updatedSource$ = new Subject<boolean>();

  public updated$ = this.updatedSource$.asObservable();

  public add(element: Element): void {
    this.elements.push(element);
  }

  public remove(element: Element): void {
    const index = this.elements.indexOf(element);

    if (index === -1) {
      return;
    }

    this.elements.splice(index, 1);
  }

  public abstract draggable(): void;
}

