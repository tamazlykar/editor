import {GraphicSet} from "../graphic-set";
import {RaphaelElements} from "./RaphaelElements";
import {Text, Line, Element} from "../elements";
import {RaphaelText} from "./raphael-text";
import {RaphaelRectangle} from "./raphael-rectangle";
import {RaphaelLine} from "./raphael-line";
import { BoundingBox, UpdateInfo } from '../types';
import { getEditElementCallback } from './callback/edit-element-callback';
import { ResizableRect } from './callback/resizable-rect';

export class GraphicRaphaelSet extends GraphicSet {
  protected dragstart: any;
  protected dragmove: any;
  protected dragend: any;
  private paper: RaphaelPaper;

  constructor(paper: RaphaelPaper) {
    super();
    this.elements = new Array<RaphaelElements>();
    this.paper = paper;
    const updateSource$ = this.updateSource$;

    this.dragstart = function(x: number, y: number, e: DragEvent): {} {
      if (!e.isTrusted) {
        // for resmove Resizable Rect
        // removing frag event
        const event = new Event('mouseup', {bubbles: false, cancelable: true});
        this.node.dispatchEvent(event);
        return {};
      }
      const set = this.data('set') as GraphicRaphaelSet;
      const bBox = set.getBBox();
      const rect = paper.rect(bBox.x, bBox.y, bBox.width, bBox.height).attr('stroke', 'blue').translate(0.5, 0.5);
      this.data('dragRect', rect);
      this.data('drag-start-x', bBox.x);
      this.data('drag-start-y', bBox.y);

      return {};
    };

    this.dragmove = function(dx: number, dy: number, x: number, y: number, e: DragEvent): {} {
      let set = this.data('set') as GraphicRaphaelSet;
      const dragRect = this.data('dragRect');
      dragRect.attr({
        x: this.data('drag-start-x') + dx,
        y: this.data('drag-start-y') + dy
      });

      this.data('moveFlag', true);

      return {};
    };

    this.dragend = function(e): {} {
      // this.attr('fill', 'black');
      const dragRect = this.data('dragRect');
      this.removeData('dragRect');

      // update stuff
      if (this.data('moveFlag')) {
        updateSource$.next({
          x: dragRect.attr('x'),
          y: dragRect.attr('y'),
          width: dragRect.attr('width'),
          height: dragRect.attr('height')
        });

        // for resmove Resizable Rect
        const event = new Event('mousedown', {bubbles: false, cancelable: true});
        this.node.dispatchEvent(event);
      }

      dragRect.remove();


      return {};
    };
  }

  public draggable(): void {
    this.isDraggable = true;

    for (const element of this.elements) {
      this.setDraggableEvent(element as RaphaelElements);
    }
  }

  public resizable(): void {
    this.isResizable = true;

    for (const element of this.elements) {
      this.setResizableEvent(element as RaphaelElements);
    }

    const canvas = document.getElementById('canvas');
    canvas.addEventListener('mousedown', () => {
      ResizableRect.remove();
    });
  }

  // private click() {
  //   let el: RaphaelElements;
  //   for (const element of this.elements) {
  //     el = element as RaphaelElements;
  //     el.onmousedown()
  //   }
  // }

  public getBBox(): BoundingBox {
    let setBBox: BoundingBox;

    for (const element of this.elements) {
      let box: BoundingBox = element.getBBox();
      if (!setBBox) {
        setBBox = Object.assign({}, box);
        continue;
      }
      if (box.x < setBBox.x) {
        setBBox.x = box.x;
      }
      if (box.y < setBBox.y) {
        setBBox.y = box.y;
      }
      if (box.x2 > setBBox.x2) {
        setBBox.x2 = box.x2;
      }
      if (box.y2 > setBBox.y2) {
        setBBox.y2 = box.y2;
      }
    }

    setBBox.width = setBBox.x2 - setBBox.x;
    setBBox.height = setBBox.y2 - setBBox.y;
    return setBBox;
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

  protected setDraggableEvent(element: RaphaelElements) {
    element.data('set', this);
    element.drag(this.dragmove, this.dragstart, this.dragend);
  }

  protected setResizableEvent(element: RaphaelElements) {
    element.data('set', this);
    element.mousedown(getEditElementCallback(this.paper, this.updateSource$, this.clickSource$));
  }
}
