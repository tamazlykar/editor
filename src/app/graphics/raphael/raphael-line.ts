import {Line} from "../elements";
import {Color, StrokeDasharray} from "../types";
import {ElementVisitor} from "../element-visitor";
import {RaphaelElements} from "./RaphaelElements";

export class RaphaelLine extends Line implements RaphaelElements {
  private element: RaphaelElement;

  private _x1: number;
  private _y1: number;
  private _x2: number;
  private _y2: number;
  private _stroke: Color;
  private _strokeWidth: number;
  private _strokeDasharray: StrokeDasharray;

  constructor(paper: RaphaelPaper, x1: number, y1: number, x2: number, y2: number) {
    super();
    this.element = paper.path(this.constructPath(x1, y1, x2, y2));
  }

  get x1(): number {
    let c = this.getPathCoords(this.element.attr('path'));
    return c.x1;
  }

  set x1(x1: number) {
    let c = this.getPathCoords(this.element.attr('path'));
    this.element.attr('path', this.constructPath(x1, c.y1, c.x2, c.y2));
  }

  get y1(): number {
    let c = this.getPathCoords(this.element.attr('path'));
    return c.y1;
  }

  set y1(y1: number) {
    let c = this.getPathCoords(this.element.attr('path'));
    this.element.attr('path', this.constructPath(c.x1, y1, c.x2, c.y2));
  }

  get x2(): number {
    let c = this.getPathCoords(this.element.attr('path'));
    return c.x2;
  }

  set x2(x2: number) {
    let c = this.getPathCoords(this.element.attr('path'));
    this.element.attr('path', this.constructPath(c.x1, c.y1, x2, c.y2));
  }

  get y2(): number {
    let c = this.getPathCoords(this.element.attr('path'));
    return c.y2;
  }

  set y2(y2: number) {
    let c = this.getPathCoords(this.element.attr('path'));
    this.element.attr('path', this.constructPath(c.x1, c.y1, c.x2, y2));
  }

  get stroke(): Color {
    return this.element.attr('stroke');
  }

  set stroke(stroke: Color) {
    this.element.attr('stroke', stroke);
  }

  get strokeWidth(): number {
    return this.element.attr('stroke-width');
  }

  set strokeWidth(width: number) {
    this.element.attr('stroke-width', width);
  }

  get strokeDasharray(): StrokeDasharray {
    return this.element.attr('stroke-dasharray');
  }

  set strokeDasharray(type: StrokeDasharray) {
    this.element.attr('stroke-dasharray', type);
  }

  public accept(visitor: ElementVisitor) {
    visitor.visitLine(this);
  }

  public moveTo(x: number, y: number) {
    this.element.attr({
      'x': x,
      'y': y
    });
  }

  public data(key: string, value?: any) {
    if (value) {
      this.element.data(key, value);
    } else {
      return this.element.data(key);
    }
  }

  public drag(onmove, onstart, onend) {
    this.element.drag(onmove, onstart, onend);
  }

  private constructPath(x1: number, y1: number, x2: number, y2: number) {
    return `M${x1},${y1}L${x2},${y2}`;
  }

  private getPathCoords(path: Array<any>) {
    if (path.length !== 2 || path[0][0] !== 'M' || path[1][0] !== 'L') {
      console.log('Warning: path coords may not be correct');
    }

    return {
      x1: path[0][1],
      y1: path[0][2],
      x2: path[1][1],
      y2: path[1][2]
    };
  }
}