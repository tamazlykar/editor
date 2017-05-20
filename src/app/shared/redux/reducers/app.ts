import { ActionTypes, Actions } from '../actions/app';

export interface State {
  userId: string | null;
  projectId: string | null;
  diagramId: string | null;
  modelElementId: string | null;
  submodelElementId: string | null;
  viewElementId: string | null;
}

export const initialState: State = {
  userId: null,
  projectId: null,
  diagramId: null,
  modelElementId: null,
  submodelElementId: null,
  viewElementId: null
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case ActionTypes.SET_USER: {
      const userId = action.payload;
      return Object.assign({}, state, {userId});
    }
    case ActionTypes.SET_PROJECT: {
      const projectId = action.payload;
      return Object.assign({}, state, {projectId});
    }
    case ActionTypes.SET_DIAGRAM: {
      const diagramId = action.payload;
      return Object.assign({}, state, {diagramId});
    }
    case ActionTypes.SET_MODEL_ELEMENT: {
      const modelElementId = action.payload.modelId;
      const submodelElementId = action.payload.submodelId;
      return Object.assign({}, state, {modelElementId}, {submodelElementId});
    }
    case ActionTypes.SET_VIEW_ELEMENT: {
      const viewElementId = action.payload;
      return Object.assign({}, state, {viewElementId});
    }
    default:
      return state;
  }
}


export const getUserId = (state: State) => state.userId;
export const getProjectId = (state: State) => state.projectId;
export const getDiagramId = (state: State) => state.diagramId;
export const getModelElementId = (state: State) => state.modelElementId;
export const getSubmodelElementId = (state: State) => state.submodelElementId;
export const getViewElementId = (state: State) => state.viewElementId;
