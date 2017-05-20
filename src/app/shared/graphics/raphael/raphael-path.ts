import { Path } from '../elements';
import { Color, StrokeDasharray, LineEnd, LineEndPosition, BoundingBox } from '../types';
import { RaphaelElements } from './RaphaelElements';

export class RaphaelPath extends Path implements RaphaelElements {
  private element: RaphaelElement;

  private _path: string;
  private _stroke: Color;
  private _strokeWidth: number;
  private _strokeDasharray: StrokeDasharray;

  constructor(paper: RaphaelPaper, path: string) {
    super();
    this.element = paper.path(path);
  }

  get path(): string {
    return this.element.attr('path').toString();
  }

  set path(path: string) {
    this.element.attr('path', path);
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

  get fill(): Color {
    return this.element.attr('fill');
  }

  set fill(color: Color) {
    this.element.attr('fill', color);
  }

  public lineEnd(type: LineEnd, position: LineEndPosition) {
    // TODO: Line End
  }

  public moveTo(x: number, y: number, x2?: number, y2?: number) {
    const path = this.constructPath(x, y, x2, y2);
    this.element.attr('path', path);
  }

  public data(key: string, value?: any): any {
    if (value) {
      this.element.data(key, value);
    } else {
      const data = this.element.data(key);
      return data;
    }
  }

  public drag(onmove: (dx: number, dy: number, x: number, y: number, event: DragEvent) => { },
              onstart: (x: number, y: number, event: DragEvent) => { },
              onend: (DragEvent: any) => { })
  {
    this.element.drag(onmove, onstart, onend);
  }

  private constructPath(x1: number, y1: number, x2: number, y2: number) {
    return `M${x1},${y1}L${x2},${y2}`;
  }

  public show() {
    this.element.show();
  }

  public hide() {
    this.element.hide();
  }

  public getBBox(): BoundingBox {
    return this.element.getBBox();
  }

  public remove() {
    this.element.remove();
  }

  public mousedown(handler: Function) {
    this.element.mousedown(handler);
  }

  public addEventListener(type: string, listener: EventListenerOrEventListenerObject) {
    this.element.node.addEventListener(type, listener);
  }

  public removeEventListener(type: string, listener: EventListenerOrEventListenerObject) {
    this.element.node.removeEventListener(type, listener);
  }
}
