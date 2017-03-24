import {Text, Rectangle, Line} from './elements';
import {GraphicSet} from "./graphic-set";

export abstract class ElementFactory {
  public abstract initialize(element: HTMLElement, width: number, height: number): void;
  public abstract text(x: number, y: number, text: string): Text;
  public abstract rect(x: number, y: number, width: number, height: number): Rectangle;
  public abstract line(x1: number, y1: number, x2: number, y2: number): Line;
  public abstract set(): GraphicSet;
}
