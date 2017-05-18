import { ElementPresentationModel } from './element-presentation-model';
import { CommentModel, CommentView} from '../../data-model';
import { Graphics, Path, Text, GraphicSet, Color, UpdateInfo, ClickInfo } from '../../graphics';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class CommentPresentationModel extends ElementPresentationModel {
  public updateStream$: Observable<CommentView>;
  private updateSubject$: Subject<CommentView>;
  private path: Path;
  private text: Text;
  private graphicSet: GraphicSet;
  private graphic: Graphics;
  private view: CommentView;
  private readonly noteSymbolSize = 15;
  private readonly padding = {
    top: 10,
    left: 10
  };

  constructor(graphic: Graphics, model: CommentModel, view: CommentView) {
    super();
    this.updateSubject$ = new Subject<CommentView>();
    this.updateStream$ = this.updateSubject$.asObservable();

    this.graphic = graphic;
    this.graphicSet = graphic.set();

    this.view = view;

    const pathString = this.buildPathString(view.x, view.y, view.width, view.height);
    this.path = this.graphic.path(pathString);
    this.path.fill = Color.white;
    this.path.data('modelId', model.$key);
    this.path.data('viewId', view.$key);

    this.text = this.graphic.text(view.x + this.padding.left, view.y + this.padding.top, model.body);
    this.text.data('modelId', model.$key);
    this.text.data('viewId', view.$key);

    this.graphicSet.add(this.path);
    this.graphicSet.add(this.text);
    this.graphicSet.draggable();
    this.graphicSet.resizable();

    this.graphicSet.updates$.subscribe((updates: UpdateInfo) => {
      const newView = Object.assign({}, this.view);
      newView.x = updates.x;
      newView.y = updates.y;
      newView.width = updates.width;
      newView.height = updates.height;

      this.updateSubject$.next(newView);
    });

    this.graphicSet.clicks$.subscribe((clickInfo: ClickInfo) => {
      this.clickSubject$.next(clickInfo);
    });
  }

  public update(model: CommentModel, view: CommentView) {
    this.view = view;

    this.path.path = this.buildPathString(view.x, view.y, view.width, view.height);
    this.text.x = view.x + this.padding.left;
    this.text.y = view.y + this.padding.top;
    this.text.text = model.body;
  }

  private buildPathString(x: number, y: number, w: number, h: number) {
    const t = this.noteSymbolSize;
    return `M${x},${y}V${y + h}H${x + w}V${y + t}L${x + w - t},${y}H${x}M${x + w - t},${y}V${y + t}H${x + w}`;
  }
}
