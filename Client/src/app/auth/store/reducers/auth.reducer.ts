import { AuthActions, AuthApiActions } from "../actions";
import { User } from "../../models/user";

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null
};

export function reducer(
  state = initialState,
  action: AuthApiActions.AuthApiActionsUnion | AuthActions.AuthActionsUnion
): State {
  switch (action.type) {
    case AuthApiActions.loginSuccess.type: {
      return {
        ...state,
        user: action.user
      };
    }

    case AuthActions.logout.type: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getUser = (state: State) => state.user;
