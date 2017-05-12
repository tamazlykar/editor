import { Action } from '@ngrx/store';
import { ViewModel } from '../../data-model';

export const ActionTypes = {
  ADD_VIEW_MODEL:              'ADD_VIEW_MODEL',
  UPDATE_VIEW_MODEL:           'UPDATE_VIEW_MODEL',
  DELETE_VIEW_MODEL:           'DELETE_VIEW_MODEL'
};

export class AddViewModelAction implements Action {
  public type = ActionTypes.ADD_VIEW_MODEL;
  constructor(public payload: {id: string, element: ViewModel}) {};
}

export class UpdateViewModelAction implements Action {
  public type = ActionTypes.UPDATE_VIEW_MODEL;
  constructor(public payload: {id: string, element: ViewModel}) {};
}

export class DeleteViewModelAction implements Action {
  public type = ActionTypes.DELETE_VIEW_MODEL;
  constructor(public payload: string) {};
}

export type Actions
  = AddViewModelAction
  | UpdateViewModelAction
  | DeleteViewModelAction;
