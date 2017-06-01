import { ActionTypes } from '../actions/object-model';
import { combineReducers } from '@ngrx/store';
import { ObjectModel } from '../../data-model';

export interface State {
  ids: Array<string>;
  elements: {[propName: string]: ObjectModel};
}

const idsInitialState = [];
const elementsInitialState = {};

export const initaialState: State = {
  ids: idsInitialState,
  elements: elementsInitialState
};


const removePropertyFromObject = (obj, prop) => {
  const {[prop]: omit, ...res} = obj;
  return res;
};

function elementsReducer(state = elementsInitialState, action): {} {
  switch (action.type) {
    case ActionTypes.ADD_OBJECT_MODEL: {
      const {payload} = action;
      const {id, element} = payload;

      return {
        ...state,
        [id]: element
      };
    }
    case ActionTypes.UPDATE_OBJECT_MODEL: {
      const {payload} = action;
      const {id, element} = payload;

      return {
        ...state,
        [id]: element
      };
    }
    case ActionTypes.DELETE_OBJECT_MODEL: {
      return removePropertyFromObject(state, action.payload);
    }
    default:
      return state;
  }
}

function idsReducer(state = idsInitialState, action): Array<string> {
  switch (action.type) {
    case ActionTypes.ADD_OBJECT_MODEL: {
      const {payload} = action;
      const {id} = payload;
      const newIds = [...state, id];
      return newIds;
    }
    case ActionTypes.DELETE_OBJECT_MODEL: {
      return state.filter((val: ObjectModel) => {
        return val !== action.payload;
      });
    }
    default:
      return state;
  }
}

export const reducer = combineReducers({
  ids: idsReducer,
  elements: elementsReducer
});

export const getObjectModelElementsIds = (state: State) => state.ids;
export const getObjectModelElementsInObject = (state: State) => state.elements;
