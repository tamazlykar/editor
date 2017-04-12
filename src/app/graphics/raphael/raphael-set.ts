import {GraphicSet} from "../graphic-set";
import {RaphaelElements} from "./RaphaelElements";
import {Text, Line} from "../elements";
import {RaphaelText} from "./raphael-text";
import {RaphaelRectangle} from "./raphael-rectangle";
import {RaphaelLine} from "./raphael-line";

export class RaphaelSet extends GraphicSet {
  protected dragstart: any;
  protected dragmove: any;
  protected dragend: any;

  constructor() {
    super();
    this.elements = new Array<Element>();
    const updatedSource$ = this.updatedSource$;

    this.dragstart = function(x: number, y: number, e: DragEvent): {} {
      this.attr('fill', 'orange');
      let set = this.data('set') as RaphaelSet;
      set.setStartCoords();

      console.log(set);

      return {};
    };

    this.dragmove = function(dx: number, dy: number, x: number, y: number, e: DragEvent): {} {
      let set = this.data('set') as RaphaelSet;
      set.move(dx, dy);
      return {};
    };

    this.dragend = function(e): {} {
      this.attr('fill', 'black');
      updatedSource$.next(true);
      return {};
    };
  }

  public draggable(): void {
    let el: RaphaelElements;
    for (const element of this.elements) {
      el = element as RaphaelElements;
      el.data('set', this);
      el.drag(this.dragmove, this.dragstart, this.dragend);
    }
  }

  private move(dx: number, dy: number) {
    let el: RaphaelElements;
    for (const element of this.elements) {
      el = element as RaphaelElements;

      if (element instanceof RaphaelLine) {
        let x1: number = el.data('drag-start-x1');
        let y1: number = el.data('drag-start-y1');
        let x2: number = el.data('drag-start-x2');
        let y2: number = el.data('drag-start-y2');
        el.moveTo(x1 + dx, y1 + dy, x2 + dx, y2 + dy);
        continue;
      }

      let x = el.data('drag-start-x');
      let y = el.data('drag-start-y');
      el.moveTo(x + dx, y + dy);
    }
  }
  private setStartCoords() {
    let el: RaphaelElements;
    for (const element of this.elements) {
      el = element as RaphaelElements;

      if (element instanceof RaphaelLine) {
        let elem = element as Line;
        el.data('drag-start-x1', elem.x1);
        el.data('drag-start-y1', elem.y1);
        el.data('drag-start-x2', elem.x2);
        el.data('drag-start-y2', elem.y2);
        continue;
      }

      let elem = element as Text; // Text and Rect both have x, y variables
      el.data('drag-start-x', elem.x);
      el.data('drag-start-y', elem.y);
    }
  }
}
