import { ActionTypes } from '../actions/project';
import { ProjectModel } from '../../data-model';

export interface State {
  elements: Array<ProjectModel>;
}

export const initialState: State = {
  elements: []
};

export function reducer(state = initialState, action): State {
  switch (action.type) {
    case ActionTypes.ADD_PROJECT: {
      return {
        elements: [...state.elements, action.payload]
      };
    }
    case ActionTypes.UPDATE_PROJECT: {
      const {id, element} = action.payload;
      return {
        elements: state.elements.map((data: ProjectModel) => {
          if (data.$key !== id) {
            return data;
          }
          return element;
        })
      };
    }
    case ActionTypes.REMOVE_PROJECT: {
      return {
        elements: state.elements.filter((val: ProjectModel) => {
          return val.$key !== action.payload;
        })
      };
    }
    default:
      return state;
  }
}

export const getProjectElementsState = (state: State) => state.elements;
