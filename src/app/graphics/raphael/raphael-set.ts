import {GraphicSet} from "../graphic-set";
import {RaphaelDataVisitor} from "./visitors";
import {RaphaelElements} from "./RaphaelElements";
import {Text} from "../elements";

export class RaphaelSet extends GraphicSet {
  protected dragstart: any;
  protected dragmove: any;
  protected dragend: any;

  constructor() {
    this.elements = new Array<Element>();

    this.dragstart = function(x: number, y: number, e: DragEvent): {} {
      this.attr('fill', 'orange');
      let set = this.data('set') as RaphaelSet;
      set.setStartCoords();
      return {};
    };

    this.dragmove = function(dx: number, dy: number, x: number, y: number, e: DragEvent): {} {
      let set = this.data('set') as RaphaelSet;
      set.move(dx, dy);
      return {};
    };

    this.dragend = function(e): {} {
      this.attr('fill', 'black');
      return {};
    };
  }

  public draggable(isDraggable: boolean): void {
    if (isDraggable) {
      //let dataVisitor = new RaphaelDataVisitor;
      let el: RaphaelElements;
      for (const element of this.elements) {
        //element.accept(dataVisitor, {key: 'set', value: this});
        el = element as RaphaelElements;
        el.data('set', this);
        el.drag(this.dragmove, this.dragstart, this.dragend);
      }
    } else {
      // TODO: make undrag
    }
  }

  private move(dx: number, dy: number) {
    let el: RaphaelElements;
    for (const element of this.elements) {
      el = element as RaphaelElements;
      let x = el.data('drag-start-x');
      let y = el.data('drag-start-y');
      el.moveTo(x + dx, y + dy);
    }
  }
  private setStartCoords() {
    let el: RaphaelElements;
    for (const element of this.elements) {
      el = element as RaphaelElements;
      let elem = element as Text;
      el.data('drag-start-x', elem.x);
      el.data('drag-start-y', elem.y);
    }
  }
}
