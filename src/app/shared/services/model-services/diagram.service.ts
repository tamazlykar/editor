import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getDiagramListState, getDiagramId } from '../../redux/reducers';
import { SetDiagramAction } from '../../redux/actions/app';
import { DiagramDataService } from '../data-services';

import { DiagramModel } from '../../data-model';

import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DiagramService {
  public diagrams$: Observable<DiagramModel[]>;
  public currentDiagram$: Observable<DiagramModel>;
  private currentDiagramId$: Observable<string>;

  constructor(
    private store: Store<State>,
    private dataService: DiagramDataService
  ) {
    this.diagrams$ = this.store.select(getDiagramListState);
    this.currentDiagramId$ = this.store.select(getDiagramId);

    this.currentDiagram$ = this.currentDiagramId$
      .combineLatest(this.diagrams$, (id, diagrams) => {
        if (!id) {
          return;
        }
        return diagrams.find(val => id === val.$key);
      }).distinctUntilChanged();
  }

  public add(diagram: DiagramModel) {
    this.dataService.add(diagram);
  }

  public update(id: string, diagram: DiagramModel) {
    this.dataService.update(id, diagram);
  }

  public remove(id: string) {
    this.dataService.remove(id);
  }

  public setCurrent(id: string) {
    this.store.dispatch(new SetDiagramAction(id));
  }
}
