import { ActionTypes } from '../actions/diagram';
import { DiagramModel } from '../../data-model';

export interface State {
  elements: Array<DiagramModel>;
}

export const initialState: State = {
  elements: []
};

export function reducer(state = initialState, action): State {
  switch (action.type) {
    case ActionTypes.ADD_DIAGRAM: {
      return {
        elements: [...state.elements, action.payload]
      };
    }
    case ActionTypes.UPDATE_DIAGRAM: {
      const {id, element} = action.payload;
      return {
        elements: state.elements.map((data: DiagramModel) => {
          if (data.$key !== id) {
            return data;
          }
          return element;
        })
      };
    }
    case ActionTypes.REMOVE_DIAGRAM: {
      return {
        elements: state.elements.filter((val: DiagramModel) => {
          return val.$key !== action.payload;
        })
      };
    }
    default:
      return state;
  }
}

export const getDiagramElementsState = (state: State) => state.elements;
