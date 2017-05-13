import { Action } from '@ngrx/store';
import { ProjectModel } from '../../data-model';

export const ActionTypes = {
  ADD_PROJECT:      'ADD_PROJECT',
  UPDATE_PROJECT:   'UPDATE_PROJECT',
  REMOVE_PROJECT:   'REMOVE_PROJECT',
};

export class AddProjectAction implements Action {
  public type = ActionTypes.ADD_PROJECT;
  constructor(public payload: ProjectModel) {};
}

export class UpdateProjectAction implements Action {
  public type = ActionTypes.UPDATE_PROJECT;
  constructor(public payload: {id: string, element: ProjectModel}) {};
}

export class RemoveProjectAction implements Action {
  public type = ActionTypes.REMOVE_PROJECT;
  constructor(public payload: string) {};
}


export type Actions
  = AddProjectAction
  | UpdateProjectAction
  | RemoveProjectAction;
