import {Text, Rectangle, Line, Path } from './elements';
import { ElementFactory } from './element-factory';
import {RaphaelFactory} from './raphael/raphael-factory';
import {GraphicSet} from './graphic-set';

export class Graphics {
  private _factory: ElementFactory;

  constructor(element: HTMLElement, width: number, height: number) {
    this._factory = new RaphaelFactory();
    this._factory.initialize(element, width, height);
  }

  public text(x: number, y: number, text: string): Text {
    return this._factory.text(x, y, text);
  }

  public rect(x: number, y: number, width: number, height: number): Rectangle {
    return this._factory.rect(x, y, width, height);
  }

  public line(x1: number, y1: number, x2: number, y2: number): Line {
    return this._factory.line(x1, y1, x2, y2);
  }

  public path(path: string): Path {
    return this._factory.path(path);
  }

  public set(): GraphicSet {
    return this._factory.set();
  }

  public get factory() {
    return this._factory;
  }
}
