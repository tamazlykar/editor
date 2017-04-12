import { ActionTypes, Actions } from '../actions/ui-state';

export interface State {
  sidenav: boolean;
}

export const initialState: State = {
  sidenav: false
};

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.OPEN_SIDENAV:
      return {
        sidenav: true
      };
    case ActionTypes.CLOSE_SIDENAV:
      return {
        sidenav: false
      };
    default:
      return state;
  }
}

export const getSidenavState = (state: State) => state.sidenav;
