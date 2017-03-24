export class Element {
  protected element: RaphaelElement;
  protected dragstart: any;
  protected dragmove: any;
  protected dragend: any;

  constructor() {
    this.dragstart = function(x: number, y: number, e: DragEvent): {} {
      this.attr('fill', 'orange');
      this.data('drag-start-x', this.attr('x'));
      this.data('drag-start-y', this.attr('y'));
      return {};
    };

    this.dragmove = function(dx: number, dy: number, x: number, y: number, e: DragEvent): {} {
      this.attr('x', this.data('drag-start-x') + dx);
      this.attr('y', this.data('drag-start-y') + dy);
      return {};
    };

    this.dragend = function(e): {} {
      this.attr('fill', 'black');
      return {};
    };
  }

  public draggable(isDraggable: boolean): void {
    this.element.drag(this.dragmove, this.dragstart, this.dragend);
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

  public drag(onmove, onstart, onend) {
    this.element.drag(onmove, onstart, onend);
  }
}
