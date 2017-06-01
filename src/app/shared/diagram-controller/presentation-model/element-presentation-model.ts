import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ClickInfo, GraphicSet } from '../../graphics';

export abstract class ElementPresentationModel {
  public clickStream$: Observable<ClickInfo>;
  protected clickSubject$: Subject<ClickInfo>;
  protected graphicSet: GraphicSet;

  constructor() {
    this.clickSubject$ = new Subject<ClickInfo>();
    this.clickStream$ = this.clickSubject$.asObservable();
  }

  public addEventListener(type: string, listener: EventListenerOrEventListenerObject) {
    this.graphicSet.addEventListener(type, listener);
  }

  public removeEventListener(type: string, listener: EventListenerOrEventListenerObject) {
    this.graphicSet.removeEventListener(type, listener);
  }

  public updateModel(model: any) {};

  public updateView(model: any) {}; // TODO

  public abstract remove();
}
