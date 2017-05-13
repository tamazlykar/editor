import { Element } from '../elements';

export interface RaphaelElements extends Element {
  data(key: string, value?: any);
  moveTo(x: number, y: number, x2?: number, y2?: number);
  drag(onmove: (dx: number, dy: number, x: number, y: number, event: DragEvent) => {},
       onstart: (x: number, y: number, event: DragEvent) => {},
       onend: (DragEvent: any) => {});
  mousedown(handler: Function);
}
