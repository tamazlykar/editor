import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';
import { createSelector } from 'reselect';
import * as app from './app';
import * as ui from './ui';
import * as pr from './project';
import * as dm from './diagram';
import * as ob from './object-model';
import * as vm from './view-model';

export interface State {
  app: app.State;
  ui: ui.State;
  projects: pr.State;
  diagrams: dm.State;
  model: ob.State;
  view: vm.State;
}

const reducers = {
  app: app.reducer,
  ui: ui.reducer,
  projects: pr.reducer,
  diagrams: dm.reducer,
  model: ob.reducer,
  view: vm.reducer
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


const getProjectsState = (state: State) => state.projects;
export const getProjectListState = createSelector(getProjectsState, pr.getProjectElementsState);

const getDiagramState = (state: State) => state.diagrams;
export const getDiagramListState = createSelector(getDiagramState, dm.getDiagramElementsState);

const getModelState = (state: State) => state.model;
export const getObjectModelIds = createSelector(getModelState, ob.getObjectModelElementsIds);

const getViewState = (state: State) => state.view;
export const getViewModelIds = createSelector(getViewState, vm.getViewModelElementsIds);
