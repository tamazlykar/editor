import {
  TextAnchor,
  TextDecoration,
  FontStyle,
  FontFamily,
  FontWeight,
  Color,
  StrokeDasharray, Params, LineEndPosition, LineEnd,
  BoundingBox
} from './types';

export abstract class Element {
  abstract data(key: string, value?: any): any;
  abstract hide();
  abstract show();
  abstract getBBox(): BoundingBox;
  abstract remove();

  abstract addEventListener(type: string, listener: EventListenerOrEventListenerObject);
  abstract removeEventListener(type: string, listener: EventListenerOrEventListenerObject);
}

export abstract class Text extends Element {
  abstract x: number;
  abstract y: number;
  abstract text: string;
  abstract textAnchor: TextAnchor;
  abstract textDecoration: TextDecoration;
  abstract fontSize: number;
  abstract fontStyle: FontStyle;
  abstract fontFamily: FontFamily;
  abstract fontWeight: FontWeight;
  abstract fill: Color;
}

export abstract class Rectangle extends Element {
  abstract x: number;
  abstract y: number;
  abstract height: number;
  abstract width: number;
  abstract stroke: Color;
  abstract strokeWidth: number;
  abstract fill: Color;
}

export abstract class Line extends Element {
  abstract x1: number;
  abstract y1: number;
  abstract x2: number;
  abstract y2: number;
  abstract stroke: Color;
  abstract strokeWidth: number;
  abstract strokeDasharray: StrokeDasharray

  abstract lineEnd(type: LineEnd, position: LineEndPosition);
}

export abstract class Path extends Element {
  abstract path: string;
  abstract stroke: Color;
  abstract strokeWidth: number;
  abstract strokeDasharray: StrokeDasharray
  abstract fill: Color;
}
