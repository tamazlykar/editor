import {ElementFactory} from '../element-factory';
import {RaphaelText} from './raphael-text';
import { Text, Rectangle, Line, Path } from '../elements';
import {RaphaelRectangle} from './raphael-rectangle';
import {RaphaelLine} from './raphael-line';
import { RaphaelPath } from './raphael-path';
import {GraphicSet} from '../graphic-set';
import {GraphicRaphaelSet} from './raphael-set';
import {RaphaelExportService} from '../../export';


export class RaphaelFactory extends ElementFactory {
  private _paper: RaphaelPaper;

  public initialize(element: HTMLElement, width: number, height: number): void {
    this._paper = Raphael(element, width, height);
  }

  public text(x: number, y: number, text: string): Text {
    return new RaphaelText(this._paper, x, y, text);
  }

  public rect(x: number, y: number, width: number, height: number): Rectangle {
    return new RaphaelRectangle(this._paper, x, y, width, height);
  }

  public line(x1: number, y1: number, x2: number, y2: number): Line {
    return new RaphaelLine(this._paper, x1, y1, x2, y2);
  }

  public path(path: string): Path {
    return new RaphaelPath(this._paper, path);
  }

  public set(): GraphicSet {
    return new GraphicRaphaelSet(this._paper);
  }

  get paper() {
    return this._paper;
  }
}
