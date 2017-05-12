import { Action } from '@ngrx/store';
import { ObjectModel } from '../../data-model';

export const ActionTypes = {
  ADD_OBJECT_MODEL:              'ADD_OBJECT_MODEL',
  UPDATE_OBJECT_MODEL:           'UPDATE_OBJECT_MODEL',
  DELETE_OBJECT_MODEL:           'DELETE_OBJECT_MODEL'
};

export class AddObjectModelAction implements Action {
  public type = ActionTypes.ADD_OBJECT_MODEL;
  constructor(public payload: {id: string, element: ObjectModel}) {};
}

export class UpdateObjectModelAction implements Action {
  public type = ActionTypes.UPDATE_OBJECT_MODEL;
  constructor(public payload: {id: string, element: ObjectModel}) {};
}

export class DeleteObjectModelAction implements Action {
  public type = ActionTypes.DELETE_OBJECT_MODEL;
  constructor(public payload: string) {};
}

export type Actions
  = AddObjectModelAction
  | UpdateObjectModelAction
  | DeleteObjectModelAction;
