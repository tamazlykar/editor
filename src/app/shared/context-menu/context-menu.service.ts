import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ElementService } from '../services/element-service';
import { Store } from '@ngrx/store';
import { State, getModelElementId, getViewElementId, getSubmodelElementId } from '../redux/reducers';
import { } from '../redux/actions/app';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

@Injectable()
export class ContextMenuService{
  public show: Subject<{event: MouseEvent, obj: any[]}>;

  constructor(
    private elementService: ElementService,
    private store: Store<State>,
    private dialog: MdDialog
  ) {
    this.show = new Subject();
  }

  public getClassifierCallback(modelId: string, viewId: string) {
    const mId = modelId;
    const vId = viewId;

    return (event: MouseEvent) => {
      const menu = [
        {title: 'Добавить атрибут', action: () => this.elementService.addAttribute(mId, vId)},
        {title: 'Добавить операцию', action: () => this.elementService.addOperation(mId, viewId)},
        {title: 'Удалить', action: () => this.showDeleteDialog()}
      ];

      this.show.next({event: event, obj: menu});
      event.preventDefault();
    };
  }


  private showDeleteDialog() {
    this.deleteCurrentModel();
    // const dialogRef = this.dialog.open(DeleteDialogComponent);
    // dialogRef.afterClosed().subscribe(a => console.log(a));
  }

  private deleteCurrentModel() {
    const source = Observable.combineLatest(
      this.store.select(getModelElementId),
      this.store.select(getViewElementId),
      this.store.select(getSubmodelElementId)
    );

    source.first().subscribe(([modelId, viewId, submodelId]) => {
      if (submodelId) {
        this.elementService.removeFeatureModel(modelId, viewId, submodelId);
      } else {
        this.elementService.removeElementModel(modelId, viewId);
      }
    });
  }

  private deleteCurrentView() {
    const source = Observable.combineLatest(
      this.store.select(getViewElementId),
      this.store.select(getSubmodelElementId)
    );

    source.first().subscribe(([viewId, submodelId]) => {
      if (submodelId) {
        this.elementService.removeFeatureView(viewId, submodelId);
      } else {
        this.elementService.removeElementView(viewId);
      }
    });
  }
}
