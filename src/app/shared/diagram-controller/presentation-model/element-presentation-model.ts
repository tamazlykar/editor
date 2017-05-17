import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ClickInfo } from '../../graphics';

export class ElementPresentationModel {
  public clickStream$: Observable<ClickInfo>;
  protected clickSubject$: Subject<ClickInfo>;

  constructor() {
    this.clickSubject$ = new Subject<ClickInfo>();
    this.clickStream$ = this.clickSubject$.asObservable();
  }

  public update(model: any, view: any) {};

  public updateModel(model: any) {};

  public updateView(model: any) {}; // TODO
}
