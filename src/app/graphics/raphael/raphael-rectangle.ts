import {Color} from "../types";
import {Rectangle} from "../elements";
import {RaphaelElements} from "./RaphaelElements";

export class RaphaelRectangle extends Rectangle implements RaphaelElements {
  private element: RaphaelElement;

  private _x: number;
  private _y: number;
  private _height: number;
  private _width: number;
  private _stroke: Color;
  private _strokeWidth: number;
  private _fill: Color;

  constructor(paper: RaphaelPaper, x: number, y: number, width: number, height: number) {
    super();
    this.element = paper.rect(x, y, width, height).attr('fill', 'white');
  }

  get x(): number {
    return this.element.attr('x');
  }

  set x(x: number) {
    this.element.attr('x', x);
  }

  get y(): number {
    return this.element.attr('y');
  }

  set y(y: number) {
    this.element.attr('y', y);
  }

  get height(): number {
    return this.element.attr('height');
  }

  set height(height: number) {
    this.element.attr('height', height);
  }

  get width(): number {
    return this.element.attr('width');
  }

  set width(width: number) {
    this.element.attr('width', width);
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

  get fill(): Color {
    return this.element.attr('fill');
  }

  set fill(color: Color) {
    this.element.attr('fill', color);
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

  public drag(onmove: (dx: number, dy: number, x: number, y: number, event: DragEvent) =>{ },
              onstart: (x: number, y: number, event: DragEvent) =>{ },
              onend: (DragEvent: any) =>{ })
  {
    this.element.drag(onmove, onstart, onend);
  }
}
