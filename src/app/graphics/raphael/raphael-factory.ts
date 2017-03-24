import {ElementFactory} from "../element-factory";
import {RaphaelText} from "./raphael-text";
import {Text, Rectangle, Line} from "../elements";
import {RaphaelRectangle} from "./raphael-rectangle";
import {RaphaelLine} from "./raphael-line";
import {GraphicSet} from "../graphic-set";
import {RaphaelSet} from "./raphael-set";


export class RaphaelFactory extends ElementFactory {
  private paper: RaphaelPaper;

  public initialize(element: HTMLElement, width: number, height: number): void {
    this.paper = Raphael(element, width, height);
  }

  public text(x: number, y: number, text: string): Text {
    return new RaphaelText(this.paper, x, y, text);
  }

  public rect(x: number, y: number, width: number, height: number): Rectangle {
    return new RaphaelRectangle(this.paper, x, y, width, height);
  }

  public line(x1: number, y1: number, x2: number, y2: number): Line {
    return new RaphaelLine(this.paper, x1, y1, x2, y2);
  }

  public set(): GraphicSet {
    return new RaphaelSet();
  }
}
