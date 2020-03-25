import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from "@ngrx/store";
import { environment } from "../../environments/environment";
import * as fromRouter from "@ngrx/router-store";

import { storeFreeze } from "ngrx-store-freeze";

import * as fromLayout from "../core/store/reducers/layout.reducer";

export interface State {
  layout: fromLayout.State;
  router: fromRouter.RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer,
  router: fromRouter.routerReducer
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log("prev state", state);
    console.log("action", action);
    console.log("next state", result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  : [];

/**
 * Layout Reducers
 */
export const getLayoutState = createFeatureSelector<State, fromLayout.State>(
  "layout"
);

export const getShowSidenav = createSelector(
  getLayoutState,
  fromLayout.getShowSidenav
);

export const getShowLoader = createSelector(
  getLayoutState,
  fromLayout.getShowLoader
);
