import { Action } from '@ngrx/store';

export const ActionTypes = {
  OPEN_SIDENAV:   'OPEN_SIDENAV',
  CLOSE_SIDENAV:  'CLOSE_SIDENAV'
};

export class OpenSidenavAction implements Action {
  public type = ActionTypes.OPEN_SIDENAV;
}

export class CloseSidenavAction implements Action {
  public type = ActionTypes.CLOSE_SIDENAV;
}

export type Actions
  = OpenSidenavAction
  | CloseSidenavAction;
