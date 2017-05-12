import {Text, Rectangle, Line, Path } from './elements';
import {RaphaelFactory} from './raphael/raphael-factory';
import {GraphicSet} from './graphic-set';

export class Graphics {
  private factory: RaphaelFactory;

  constructor(element: HTMLElement, width: number, height: number) {
    this.factory = new RaphaelFactory();
    this.factory.initialize(element, width, height);
  }

  public text(x: number, y: number, text: string): Text {
    return this.factory.text(x, y, text);
  }

  public rect(x: number, y: number, width: number, height: number): Rectangle {
    return this.factory.rect(x, y, width, height);
  }

  public line(x1: number, y1: number, x2: number, y2: number): Line {
    return this.factory.line(x1, y1, x2, y2);
  }

  public path(path: string): Path {
    return this.factory.path(path);
  }

  public set(): GraphicSet {
    return this.factory.set();
  }
}
