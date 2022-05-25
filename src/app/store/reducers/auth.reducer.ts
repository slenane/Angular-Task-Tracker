import { Auth } from "../../models/auth.model";
import { AuthActionTypes, AuthActions } from "../actions/auth.actions";

const initialState: Auth = {
  isLoggedIn: false,
  isLoading: false,
  errorMessage: null,
  hasError: false,
};

export function authReducer(
  state: Auth = initialState,
  action: AuthActions
): Auth {
  switch (action.type) {
    case AuthActionTypes.SIGNUP:
      return {
        ...state,
        hasError: false,
        errorMessage: null,
        isLoading: true,
      };

    case AuthActionTypes.SIGNUP_COMPLETE:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        token: action.payload.accessToken,
        isLoading: false,
      };

    case AuthActionTypes.SIGNUP_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        hasError: true,
        isLoading: false,
      };

    case AuthActionTypes.LOGIN:
      return {
        ...state,
        hasError: false,
        errorMessage: null,
        isLoading: true,
      };

    case AuthActionTypes.LOGIN_COMPLETE:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        token: action.payload.accessToken,
        isLoading: false,
      };

    case AuthActionTypes.LOGIN_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        hasError: true,
        isLoading: false,
      };

    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        token: null,
        isLoading: false,
      };

    default:
      return state;
  }
}
