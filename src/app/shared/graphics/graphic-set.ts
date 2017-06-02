import { Element, Text } from './elements';
import { RaphaelText } from './raphael/raphael-text';
import { Subject } from 'rxjs/Subject';
import { UpdateInfo, ClickInfo } from './types';

export abstract class GraphicSet {
  protected elements: Array<Element>;
  protected updateSource$ = new Subject<UpdateInfo>();
  protected clickSource$ = new Subject<ClickInfo>();
  protected isDraggable = false;
  protected isResizable = false;
  private events: Array<{type: string, listener: EventListenerOrEventListenerObject}> = [];

  public updates$ = this.updateSource$.asObservable();
  public clicks$ = this.clickSource$.asObservable();

  public add(element: Element): void {
    this.elements.push(element);

    if (this.isDraggable) {
      this.setDraggableEvent(element);
    }

    if (this.isResizable) {
      this.setResizableEvent(element);
    }

    this.events.forEach(event => {
      element.addEventListener(event.type, event.listener);
    });
  }

  public remove(element: Element): void {
    const index = this.elements.indexOf(element);

    if (index === -1) {
      return;
    }

    this.elements.splice(index, 1);
  }

  public abstract draggable(): void;

  public abstract resizable(): void;

  public forEach(func: (value: Element, index?: number) => void) {
    this.elements.forEach(func);
  }

  public clear() {
    this.elements.length = 0;
  }

  public get length() {
    return this.elements.length;
  }

  public getElements() {
    return this.elements;
  }

  public addEventListener(type: string, listener: EventListenerOrEventListenerObject) {
    this.elements.forEach((value) => {
      value.addEventListener(type, listener);
    });

    this.events.push({type, listener});
  }

  public removeEventListener(type: string, listener: EventListenerOrEventListenerObject) {
    this.elements.forEach((value) => {
      value.removeEventListener(type, listener);
    })

    const index = this.events.findIndex((value) => value.type === type && value.listener === listener);
    this.events.splice(index, 1);
  }

  protected abstract setDraggableEvent(element: Element);
  protected abstract setResizableEvent(element: Element);
}

