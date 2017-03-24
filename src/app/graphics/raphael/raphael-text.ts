import {TextAnchor, TextDecoration, FontFamily, Color, FontStyle, FontWeight} from '../types';
import {Text} from "../elements";
import {ElementVisitor} from "../element-visitor";
import {RaphaelElements} from "./RaphaelElements";

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

  constructor(paper: RaphaelPaper, x: number, y:number, text: string) {
    super();
    this.element = paper.text(x, y, text);
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

  public accept(visitor: ElementVisitor) {
    visitor.visitText(this);
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

  public drag(onmove, onstart, onend) {
    this.element.drag(onmove, onstart, onend);
  }
}
