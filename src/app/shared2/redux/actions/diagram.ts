import { Action } from '@ngrx/store';
import { DiagramModel } from '../../data-model';

export const ActionTypes = {
  ADD_DIAGRAM:      'ADD_DIAGRAM',
  UPDATE_DIAGRAM:   'UPDATE_DIAGRAM',
  REMOVE_DIAGRAM:   'REMOVE_DIAGRAM',
};

export class AddDiagramAction implements Action {
  public type = ActionTypes.ADD_DIAGRAM;
  constructor(public payload: DiagramModel) {};
}

export class UpdateDiagramAction implements Action {
  public type = ActionTypes.UPDATE_DIAGRAM;
  constructor(public payload: {id: string, element: DiagramModel}) {};
}

export class RemoveDiagramAction implements Action {
  public type = ActionTypes.REMOVE_DIAGRAM;
  constructor(public payload: string) {};
}


export type Actions
  = AddDiagramAction
  | UpdateDiagramAction
  | RemoveDiagramAction;
