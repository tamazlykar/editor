import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';
import { createSelector } from 'reselect';
import * as app from './app-state';
import * as ui from './ui-state';

export interface State {
  app: app.State;
  ui: ui.State;
}

const reducers = {
  app: app.reducer,
  ui: ui.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

const production = false;

export function appReducer(state: any, action: any) {
  if (production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export const getAppState = (state: State) => state.app;
export const getUserId = createSelector(getAppState, app.getUserId);
export const getProjectId = createSelector(getAppState, app.getProjectId);
export const getDiagramId = createSelector(getAppState, app.getDiagramId);
export const getModelElementId = createSelector(getAppState, app.getModelElementId);
export const getViewElementId = createSelector(getAppState, app.getViewElementId);


export const getUiState = (state: State) => state.ui;
export const getSidenavState = createSelector(getUiState, ui.getSidenavState);
