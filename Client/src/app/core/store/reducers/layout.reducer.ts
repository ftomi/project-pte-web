import { Action } from "@ngrx/store";
import { LayoutActions } from "../actions";

export interface State {
  showSidenav: boolean;
  showLoader: boolean;
}

const initialState: State = {
  showSidenav: false,
  showLoader: false
};

export function reducer(state: State = initialState, action: Action): State {
  const specificAction = action as LayoutActions.LayoutActionsUnion;

  switch (specificAction.type) {
    case LayoutActions.closeSidenav.type:
      return {
        ...state,
        showSidenav: false
      };

    case LayoutActions.openSidenav.type:
      return {
        ...state,
        showSidenav: true
      };
    case LayoutActions.showLoader.type:
      return {
        ...state,
        showLoader: true
      };

    case LayoutActions.hideLoader.type:
      return {
        ...state,
        showLoader: false
      };

    default:
      return state;
  }
}

export const getShowSidenav = (state: State) => state.showSidenav;
export const getShowLoader = (state: State) => state.showLoader;
