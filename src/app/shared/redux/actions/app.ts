import { Action } from '@ngrx/store';

export const ActionTypes = {
  SET_USER:           'SET_USER',
  SET_PROJECT:        'SET_PROJECT',
  SET_DIAGRAM:        'SET_DIAGRAM',
  SET_MODEL_ELEMENT:  'SET_MODEL_ELEMENT',
  SET_VIEW_ELEMENT:   'SET_VIEW_ELEMENT'
};

export class SetUserAction implements Action {
  public type = ActionTypes.SET_USER;

  constructor(public payload: string | null) {};
}

export class SetProjectAction implements Action {
  public type = ActionTypes.SET_PROJECT;

  constructor(public payload: string | null) {};
}

export class SetDiagramAction implements Action {
  public type = ActionTypes.SET_DIAGRAM;

  constructor(public payload: string | null) {};
}

export class SetModelElementAction implements Action {
  public type = ActionTypes.SET_MODEL_ELEMENT;

  constructor(public payload: {modelId: string | null, submodelId: string | null}) {};
}

export class SetViewElementAction implements Action {
  public type = ActionTypes.SET_VIEW_ELEMENT;

  constructor(public payload: string | null) {};
}

export type Actions
  = SetUserAction
  | SetProjectAction
  | SetDiagramAction
  | SetModelElementAction
  | SetViewElementAction;
