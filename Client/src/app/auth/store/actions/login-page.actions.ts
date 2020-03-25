import { createAction, props, union } from "@ngrx/store";
import { Credentials } from "../../models/user";

export const login = createAction(
  "[Login Page] Login",
  props<{ credentials: Credentials }>()
);

// export type LoginPageActionsUnion = ReturnType<typeof login>;

export const tryAuth = createAction(
  "[Login Page] Try auth by token",
  props<{ token: String }>()
);

const all = union({ login, tryAuth });

export type LoginPageActionsUnion = typeof all;
