import { TextAnchor, TextDecoration, FontFamily, Color, FontStyle, FontWeight, BoundingBox } from '../types';
import { Text } from '../elements';
import { RaphaelElements } from './RaphaelElements';

export class RaphaelText extends Text implements RaphaelElements {
  private element: RaphaelElement;

  private _x: number;
  private _y: number;
  private _text: string;
  private _textAnchor: TextAnchor;
  private _textDecoration: TextDecoration;
  private _fontSize: number;
  private _fontStyle: FontStyle;
  private _fontFamily: FontFamily;
  private _fontWeight: FontWeight;
  private _fill: Color;

  constructor(paper: RaphaelPaper, x: number, y: number, text: string) {
    super();
    this.element = paper.text(x, y, text);
    const bBox = this.element.getBBox();
    this.element.attr('y', y + bBox.height / 2);
    this.textAnchor = TextAnchor.start;
  }

  get x(): number {
    return this.element.attr('x');
  }

  set x(x: number) {
    this.element.attr('x', x);
  }

  get y(): number {
    const bBox = this.element.getBBox()
    return this.element.attr('y') - bBox.height / 2;
  }

  set y(y: number) {
    const bBox = this.element.getBBox();
    this.element.attr('y', y + bBox.height / 2);
  }

  get text(): string {
    return this.element.attr('text');
  }

  set text(text: string) {
    this.element.attr('text', text);
  }

  get textAnchor(): TextAnchor {
    return this.element.attr('text-anchor');
  }

  set textAnchor(value: TextAnchor) {
    this.element.attr('text-anchor', value);
  }

  get textDecoration(): TextDecoration {
    return this.element.attr('text-decoration');
  }

  set textDecoration(value: TextDecoration) {
    this.element.attr('text-decoration', value);
  }

  get fontSize(): number {
    return this.element.attr('font-size');
  }

  set fontSize(size: number) {
    if (size < 0) {
      size = 0;
    }
    this.element.attr('font-size', size);
  }

  get fontFamily(): FontFamily {
    return this.element.attr('font-family');
  }

  set fontFamily(font: FontFamily) {
    this.element.attr('font-family', font);
  }

  get fill(): Color {
    return this.element.attr('fill');
  }

  set fill(color: Color) {
    this.element.attr('fill', color);
  }

  get fontStyle(): FontStyle {
    return this.element.attr('font-style');
  }

  set fontStyle(style: FontStyle) {
    this.element.attr('font-style', style);
  }

  get fontWeight(): FontWeight {
    return this.element.attr('font-weight');
  }

  set fontWeight(weight: FontWeight) {
    this.element.attr('font-weight', weight);
  }

  // Raphael specific functions

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
}
