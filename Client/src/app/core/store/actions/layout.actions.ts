import { createAction, union } from "@ngrx/store";

export const openSidenav = createAction("[Layout] Open Sidenav");
export const closeSidenav = createAction("[Layout] Close Sidenav");

export const showLoader = createAction("[Layout] Show Loader");
export const hideLoader = createAction("[Layout] Hide Loader");

const all = union({ openSidenav, closeSidenav, showLoader, hideLoader });
export type LayoutActionsUnion = typeof all;
