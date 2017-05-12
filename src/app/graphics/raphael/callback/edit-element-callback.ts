import { ResizableRect } from './resizable-rect';
import { GraphicRaphaelSet } from '../raphael-set';
import { Subject } from 'rxjs/Subject';
import { UpdateInfo } from '../../types';

export const getEditElementCallback = function(paper: RaphaelPaper, updateSource: Subject<UpdateInfo>) {
  const radius = 3;

  function getRect(bBox: BoundingBox): RaphaelElement {
    return paper.rect(bBox.x, bBox.y, bBox.width, bBox.height).attr('stroke', 'blue').translate(0.5, 0.5);
  }

  function getDots(bBox: BoundingBox): Array<RaphaelElement> {
    const d1 = paper.circle(bBox.x, bBox.y, radius).attr({cursor: 'nwse-resize', fill: 'black'}).data('dot_number', 1);
    const d2 = paper.circle(bBox.x + bBox.width / 2, bBox.y, radius).attr({cursor: 'ns-resize', fill: 'black'}).data('dot_number', 2);
    const d3 = paper.circle(bBox.x2, bBox.y, radius).attr({cursor: 'nesw-resize', fill: 'black'}).data('dot_number', 3);
    const d4 = paper.circle(bBox.x2, bBox.y + bBox.height / 2, radius).attr({cursor: 'ew-resize', fill: 'black'}).data('dot_number', 4);
    const d5 = paper.circle(bBox.x2, bBox.y2, radius).attr({cursor: 'nwse-resize', fill: 'black'}).data('dot_number', 5);
    const d6 = paper.circle(bBox.x + bBox.width / 2, bBox.y2, radius).attr({cursor: 'ns-resize', fill: 'black'}).data('dot_number', 6);
    const d7 = paper.circle(bBox.x, bBox.y2, radius).attr({cursor: 'nesw-resize', fill: 'black'}).data('dot_number', 7);
    const d8 = paper.circle(bBox.x, bBox.y + bBox.height / 2, radius).attr({cursor: 'ew-resize', fill: 'black'}).data('dot_number', 8);

    return [d1, d2, d3, d4, d5, d6, d7, d8];
  }

  function setDotPosition(dot: RaphaelElement, bBox: BoundingBox) {
    switch (dot.data('dot_number')) {
      case 1: {
        dot.attr({
          cx: bBox.x,
          cy: bBox.y
        });
        break;
      }
      case 2: {
        dot.attr({
          cx: bBox.x + bBox.width / 2,
          cy: bBox.y
        });
        break;
      }
      case 3: {
        dot.attr({
          cx: bBox.x2,
          cy: bBox.y
        });
        break;
      }
      case 4: {
        dot.attr({
          cx: bBox.x2,
          cy: bBox.y + bBox.height / 2
        });
        break;
      }
      case 5: {
        dot.attr({
          cx: bBox.x2,
          cy: bBox.y2
        });
        break;
      }
      case 6: {
        dot.attr({
          cx: bBox.x + bBox.width / 2,
          cy: bBox.y2
        });
        break;
      }
      case 7: {
        dot.attr({
          cx: bBox.x,
          cy: bBox.y2
        });
        break;
      }
      case 8: {
        dot.attr({
          cx: bBox.x,
          cy: bBox.y + bBox.height / 2
        });
        break;
      }
    }
  }

  function dragStart(x: number, y: number, e: DragEvent) {
    const set = this.data('set').get(); // get() from ResizableRect
    set.forEach((val) => {
      val.data('x', val.attr('x'));
      val.data('y', val.attr('y'));
      val.data('cx', val.attr('cx'));
      val.data('cy', val.attr('cy'));
    });
    const rect = set[0];
    rect.data('width', rect.attr('width'));
    rect.data('height', rect.attr('height'));

    event.stopPropagation();
    return {};
  }

  function dragMove(dx: number, dy: number, x: number, y: number, e: DragEvent) {
    const set = this.data('set').get(); // get() from ResizableRect
    const rect = set[0];
    switch (this.data('dot_number')) {
      case 1: {
        rect.attr({
          x: rect.data('x') + dx,
          y: rect.data('y') + dy,
          width: rect.data('width') - dx,
          height: rect.data('height') - dy
        });
        break;
      }
      case 2: {
        rect.attr({
          y: rect.data('y') + dy,
          height: rect.data('height') - dy
        });
        break;
      }
      case 3: {
        rect.attr({
          y: rect.data('y') + dy,
          width: rect.data('width') + dx,
          height: rect.data('height') - dy
        });
        break;
      }
      case 4: {
        rect.attr({
          width: rect.data('width') + dx
        });
        break;
      }
      case 5: {
        rect.attr({
          width: rect.data('width') + dx,
          height: rect.data('height') + dy
        });
        break;
      }
      case 6: {
        rect.attr({
          height: rect.data('height') + dy
        });
        break;
      }
      case 7: {
        rect.attr({
          x: rect.data('x') + dx,
          // y: rect.data('y') + dy,
          width: rect.data('width') - dx,
          height: rect.data('height') + dy
        });
        break;
      }
      case 8: {
        rect.attr({
          x: rect.data('x') + dx,
          width: rect.data('width') - dx
        });
        break;
      }
    }

    const bBox = rect.getBBox();
    set.forEach((val, index) => {
      if (index !== 0) {
        setDotPosition(val, bBox);
      }
    });
    return {};
  }

  function dragEnd(e) {
    const set = this.data('set').get();
    const rect = set[0];
    updateSource.next({
      x: rect.attr('x'),
      y: rect.attr('y'),
      width: rect.attr('width'),
      height: rect.attr('height')
    });
    return {};
  }

  return function() {
    ResizableRect.remove();

    const set = this.data('set') as GraphicRaphaelSet;
    const bBox = set.getBBox();

    const rect = getRect(bBox);
    const dots = getDots(bBox);
    const rectSet = paper.set([rect].concat(dots));

    ResizableRect.set(rectSet);
    rectSet.data('set', ResizableRect);
    rectSet.drag(dragMove, dragStart, dragEnd);


    event.stopPropagation();
    event.preventDefault();
  };
};
